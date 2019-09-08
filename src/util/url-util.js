const spaces = [' ', ' ']

const UrlUtils = {
    replaceSpaces: uri => {
        spaces.forEach(space => uri.replace(space, "%20"))
        return uri;
    }
}

module.exports = UrlUtils;