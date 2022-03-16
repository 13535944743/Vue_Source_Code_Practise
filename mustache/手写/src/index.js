import parseTemplateToTokens from './parseTemplateToTokens.js'
import renderTemplate from './renderTemplate.js'

window.TemplateEngine = {
  render(templateStr, data) {
    const tokens = parseTemplateToTokens(templateStr)

    const domStr = renderTemplate(tokens, data)
    return domStr
  }
}