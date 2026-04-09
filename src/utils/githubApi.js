const SITE_JSON_PATH = 'content/site.json'
const MENU_JSON_PATH = 'content/menu.json'
const RATIONS_JSON_PATH = 'content/rations.json'
const BANQUETS_JSON_PATH = 'content/banquets.json'

export class GitHubApi {
  constructor(token, owner, repo, branch = 'main') {
    this.token = token
    this.owner = owner
    this.repo = repo
    this.branch = branch
    this.base = `https://api.github.com/repos/${owner}/${repo}/contents`
    this.gitBase = `https://api.github.com/repos/${owner}/${repo}/git`
  }

  _headers() {
    return {
      Authorization: `Bearer ${this.token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json'
    }
  }

  async commitMultipleFiles(files, message, retries = 3) {
    for (let attempt = 0; attempt < retries; attempt++) {
      const refRes = await fetch(`${this.gitBase}/ref/heads/${this.branch}`, {
        headers: this._headers()
      })
      if (!refRes.ok) throw new Error(`Git ref error ${refRes.status}: ${await refRes.text()}`)
      const refData = await refRes.json()
      const latestCommitSha = refData.object.sha

      const commitRes = await fetch(`${this.gitBase}/commits/${latestCommitSha}`, {
        headers: this._headers()
      })
      if (!commitRes.ok) throw new Error(`Git commit error ${commitRes.status}: ${await commitRes.text()}`)
      const commitData = await commitRes.json()
      const baseTreeSha = commitData.tree.sha

      const tree = files.map(f => ({
        path: f.path,
        mode: '100644',
        type: 'blob',
        content: f.content
      }))
      const treeRes = await fetch(`${this.gitBase}/trees`, {
        method: 'POST',
        headers: this._headers(),
        body: JSON.stringify({ base_tree: baseTreeSha, tree })
      })
      if (!treeRes.ok) throw new Error(`Git tree error ${treeRes.status}: ${await treeRes.text()}`)
      const treeData = await treeRes.json()

      const newCommitRes = await fetch(`${this.gitBase}/commits`, {
        method: 'POST',
        headers: this._headers(),
        body: JSON.stringify({
          message,
          tree: treeData.sha,
          parents: [latestCommitSha]
        })
      })
      if (!newCommitRes.ok) throw new Error(`Git commit create error ${newCommitRes.status}: ${await newCommitRes.text()}`)
      const newCommitData = await newCommitRes.json()

      const updateRefRes = await fetch(`${this.gitBase}/refs/heads/${this.branch}`, {
        method: 'PATCH',
        headers: this._headers(),
        body: JSON.stringify({ sha: newCommitData.sha })
      })

      if (updateRefRes.status === 422 && attempt < retries - 1) {
        await new Promise(r => setTimeout(r, 1000 * (attempt + 1)))
        continue
      }

      if (!updateRefRes.ok) throw new Error(`Git ref update error ${updateRefRes.status}: ${await updateRefRes.text()}`)
      return newCommitData
    }
  }

  async updateAllContent(siteObject, menuObject, rationsObject, banquetsObject) {
    const files = [
      { path: SITE_JSON_PATH, content: JSON.stringify(siteObject, null, 2) },
      { path: MENU_JSON_PATH, content: JSON.stringify(menuObject, null, 2) },
      { path: RATIONS_JSON_PATH, content: JSON.stringify(rationsObject, null, 2) },
      { path: BANQUETS_JSON_PATH, content: JSON.stringify(banquetsObject, null, 2) }
    ]
    return this.commitMultipleFiles(files, 'CMS: update content')
  }

  async validateToken() {
    const res = await fetch(`https://api.github.com/repos/${this.owner}/${this.repo}`, {
      headers: this._headers()
    })
    return res.ok
  }
}
