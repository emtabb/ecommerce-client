
const triggerNativeOnChangeInput = (dom, value) => {
    var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
    nativeInputValueSetter.call(dom, value);
    var event = new Event('input', { bubbles: true});
    dom.dispatchEvent(event);
    dom.value = value;
}

export default {
    triggerNativeOnChangeInput : triggerNativeOnChangeInput
}