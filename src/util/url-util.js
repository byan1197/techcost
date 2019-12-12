const spaces = [' ', ' ']

const UrlUtils = {
    replaceSpaces: uri => {
        spaces.forEach(space => uri.replace(space, "+"))
        return uri;
    },
    replaceSpacesPlus: uri => {
        spaces.forEach(space => uri.replace(space, "+"))
        return uri;
    }
}

module.exports = UrlUtils;