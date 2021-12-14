const populateFooter = (color) => {
    return `bg-${color}-800`;
}

const populateText = (color) => {
    return `text-${color}`;
}

const populateBackground = (color) => {
    return `bg-${color}-800`;
}

const populateSelected = (color) => {
    return `bg-${color}-900`;
}

const populateUnselected = (color) => {
    return `bg-${color}-800`;
}

const populateAvailableState = (color) => {
    return color;
}

const populateUnAvailableState = (color) => {
    return `outline-${color}`;
}

const populateColor = (color) => {
    let render = ""
    switch (color) {
        case "primary" : render = "blue"; break;
        case "success" : render = "green"; break;
    }
    return render;
}

const populateVariant = (color) => {
    return color;
}

export default {
    populateFooter : populateFooter,
    populateText : populateText,
    populateBackground: populateBackground,
    populateSelected : populateSelected,
    populateUnselected : populateUnselected,
    populateAvailableState : populateAvailableState,
    populateUnAvailableState : populateUnAvailableState,
    populateColor : populateColor,
    populateVariant : populateVariant,
}