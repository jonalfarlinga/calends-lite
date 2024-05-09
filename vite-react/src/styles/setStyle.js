function setStyle(baseClass, styleClass, uniStyle) {
    return `${baseClass} ${uniStyle ? styleClass + uniStyle : null }`;
}

export default setStyle;
