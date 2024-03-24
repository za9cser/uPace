export const focusRef = (ref) => {
    const current = ref?.current;
    if (current?.focus) {
        setTimeout(() => {
            current.blur();
            current.focus();
        }, 100);
    }
};
