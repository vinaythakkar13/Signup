const Constant = {
    REGEX: {
        /* eslint-disable no-useless-escape */
        EMAIL: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        SPECIALCHARACTERS: /[!@#\$%\^\&*\)\(+=._-]/g,
        NUMBER: /[0-9]/,
        NAME: /^[a-zA-Z]*$/,
        ALPHABETCOMMA: /^[ a-zA-Z0-9\.]+$/i,
        ALPHANUMERIC: /^[a-zA-Z0-9\s\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u024F]+$/i,
        LOWERCASEUPPERCASE: /[a-z].*[A-Z]|[A-Z].*[a-z]/, // eslint-disable-next-line
        NUMERIC: /^\d*\.?\d*$/,
        NUMONLY: /^\d*$/,

    },

};
export default Constant;
