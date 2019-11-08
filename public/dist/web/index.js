const { H, R, copee } = window;
let timeout = -1;
const ImagePreview = ({ src, onclick, onload, onerror, loading }) => {
    const style = {
        filter: loading ? 'blur(5px)' : '',
        opacity: loading ? 0.1 : 1,
    };
    const title = 'Click to copy image URL to clipboard';
    return H('a', { className: 'image-wrapper', href: src, onclick }, H('img', { src, onload, onerror, style, title }));
};
const Dropdown = ({ options, value, onchange, small }) => {
    const wrapper = small ? 'select-wrapper small' : 'select-wrapper';
    const arrow = small ? 'select-arrow small' : 'select-arrow';
    return H('div', { className: wrapper }, H('select', { onchange: (e) => onchange(e.target.value) }, options.map(o => H('option', { value: o.value, selected: value === o.value }, o.text))), H('div', { className: arrow }, '▼'));
};
const TextInput = ({ value, oninput }) => {
    return H('div', { className: 'input-outer-wrapper' }, H('div', { className: 'input-inner-wrapper' }, H('input', { type: 'text', value, oninput: (e) => oninput(e.target.value) })));
};
const Button = ({ label, onclick }) => {
    return H('button', { onclick }, label);
};
const Field = ({ label, input }) => {
    return H('div', { className: 'field' }, H('label', H('div', { className: 'field-label' }, label), H('div', { className: 'field-value' }, input)));
};
const Toast = ({ show, message }) => {
    const style = { transform: show ? 'translate3d(0,-0px,-0px) scale(1)' : '' };
    return H('div', { className: 'toast-area' }, H('div', { className: 'toast-outer', style }, H('div', { className: 'toast-inner' }, H('div', { className: 'toast-message' }, message))));
};
const themeOptions = [
    { text: 'Light', value: 'light' },
    { text: 'Dark', value: 'dark' },
];
const fileTypeOptions = [
    { text: 'PNG', value: 'png' },
    { text: 'JPEG', value: 'jpeg' },
];
const fontSizeOptions = Array
    .from({ length: 10 })
    .map((_, i) => i * 25)
    .filter(n => n > 0)
    .map(n => ({ text: n + 'px', value: n + 'px' }));
const markdownOptions = [
    { text: 'Plain Text', value: '0' },
    { text: 'Markdown', value: '1' },
];
const imageLightOptions = [
    { text: 'Now', value: 'https://assets.zeit.co/image/upload/front/assets/design/now-black.svg' },
    { text: 'ZEIT', value: 'https://assets.zeit.co/image/upload/front/assets/design/zeit-black-triangle.svg' },
    { text: 'Next.js', value: 'https://assets.zeit.co/image/upload/front/assets/design/nextjs-black-logo.svg' },
    { text: 'Hyper', value: 'https://assets.zeit.co/image/upload/front/assets/design/hyper-color-logo.svg' },
];
const imageDarkOptions = [
    { text: 'Now', value: 'https://assets.zeit.co/image/upload/front/assets/design/now-white.svg' },
    { text: 'ZEIT', value: 'https://assets.zeit.co/image/upload/front/assets/design/zeit-white-triangle.svg' },
    { text: 'Next.js', value: 'https://assets.zeit.co/image/upload/front/assets/design/nextjs-white-logo.svg' },
    { text: 'Hyper', value: 'https://assets.zeit.co/image/upload/front/assets/design/hyper-bw-logo.svg' },
];
const widthOptions = [
    { text: 'width', value: 'auto' },
    { text: '50', value: '50' },
    { text: '100', value: '100' },
    { text: '150', value: '150' },
    { text: '200', value: '200' },
    { text: '250', value: '250' },
    { text: '300', value: '300' },
    { text: '350', value: '350' },
];
const heightOptions = [
    { text: 'height', value: 'auto' },
    { text: '50', value: '50' },
    { text: '100', value: '100' },
    { text: '150', value: '150' },
    { text: '200', value: '200' },
    { text: '250', value: '250' },
    { text: '300', value: '300' },
    { text: '350', value: '350' },
];
const App = (_, state, setState) => {
    const setLoadingState = (newState) => {
        window.clearTimeout(timeout);
        if (state.overrideUrl && state.overrideUrl !== newState.overrideUrl) {
            newState.overrideUrl = state.overrideUrl;
        }
        if (newState.overrideUrl) {
            timeout = window.setTimeout(() => setState({ overrideUrl: null }), 200);
        }
        setState({ ...newState, loading: true });
    };
    const { fileType = 'png', fontSize = '100px', theme = 'light', md = true, text = '**Hello** World', images = [imageLightOptions[0].value], widths = [], heights = [], showToast = false, messageToast = '', loading = true, selectedImageIndex = 0, overrideUrl = null, } = state;
    const mdValue = md ? '1' : '0';
    const imageOptions = theme === 'light' ? imageLightOptions : imageDarkOptions;
    const url = new URL(window.location.origin);
    url.pathname = `${encodeURIComponent(text)}.${fileType}`;
    url.searchParams.append('theme', theme);
    url.searchParams.append('md', mdValue);
    url.searchParams.append('fontSize', fontSize);
    for (let image of images) {
        url.searchParams.append('images', image);
    }
    for (let width of widths) {
        url.searchParams.append('widths', width);
    }
    for (let height of heights) {
        url.searchParams.append('heights', height);
    }
    return H('div', { className: 'split' }, H('div', { className: 'pull-left' }, H('div', H(Field, {
        label: 'Theme',
        input: H(Dropdown, {
            options: themeOptions,
            value: theme,
            onchange: (val) => {
                const options = val === 'light' ? imageLightOptions : imageDarkOptions;
                let clone = [...images];
                clone[0] = options[selectedImageIndex].value;
                setLoadingState({ theme: val, images: clone });
            }
        })
    }), H(Field, {
        label: 'File Type',
        input: H(Dropdown, {
            options: fileTypeOptions,
            value: fileType,
            onchange: (val) => setLoadingState({ fileType: val })
        })
    }), H(Field, {
        label: 'Font Size',
        input: H(Dropdown, {
            options: fontSizeOptions,
            value: fontSize,
            onchange: (val) => setLoadingState({ fontSize: val })
        })
    }), H(Field, {
        label: 'Text Type',
        input: H(Dropdown, {
            options: markdownOptions,
            value: mdValue,
            onchange: (val) => setLoadingState({ md: val === '1' })
        })
    }), H(Field, {
        label: 'Text Input',
        input: H(TextInput, {
            value: text,
            oninput: (val) => {
                console.log('oninput ' + val);
                setLoadingState({ text: val, overrideUrl: url });
            }
        })
    }), H(Field, {
        label: 'Image 1',
        input: H('div', H(Dropdown, {
            options: imageOptions,
            value: imageOptions[selectedImageIndex].value,
            onchange: (val) => {
                let clone = [...images];
                clone[0] = val;
                const selected = imageOptions.map(o => o.value).indexOf(val);
                setLoadingState({ images: clone, selectedImageIndex: selected });
            }
        }), H('div', { className: 'field-flex' }, H(Dropdown, {
            options: widthOptions,
            value: widths[0],
            small: true,
            onchange: (val) => {
                let clone = [...widths];
                clone[0] = val;
                setLoadingState({ widths: clone });
            }
        }), H(Dropdown, {
            options: heightOptions,
            value: heights[0],
            small: true,
            onchange: (val) => {
                let clone = [...heights];
                clone[0] = val;
                setLoadingState({ heights: clone });
            }
        }))),
    }), ...images.slice(1).map((image, i) => H(Field, {
        label: `Image ${i + 2}`,
        input: H('div', H(TextInput, {
            value: image,
            oninput: (val) => {
                let clone = [...images];
                clone[i + 1] = val;
                setLoadingState({ images: clone, overrideUrl: url });
            }
        }), H('div', { className: 'field-flex' }, H(Dropdown, {
            options: widthOptions,
            value: widths[i + 1],
            small: true,
            onchange: (val) => {
                let clone = [...widths];
                clone[i + 1] = val;
                setLoadingState({ widths: clone });
            }
        }), H(Dropdown, {
            options: heightOptions,
            value: heights[i + 1],
            small: true,
            onchange: (val) => {
                let clone = [...heights];
                clone[i + 1] = val;
                setLoadingState({ heights: clone });
            }
        })))
    })), H(Field, {
        label: `Image ${images.length + 1}`,
        input: H(Button, {
            label: `Add Image ${images.length + 1}`,
            onclick: () => {
                const nextImage = images.length === 1
                    ? 'https://cdn.jsdelivr.net/gh/remojansen/logo.ts@master/ts.svg'
                    : '';
                setLoadingState({ images: [...images, nextImage] });
            }
        }),
    }))), H('div', { className: 'pull-right' }, H(ImagePreview, {
        src: overrideUrl ? overrideUrl.href : url.href,
        loading: loading,
        onload: () => setState({ loading: false }),
        onerror: () => {
            setState({ showToast: true, messageToast: 'Oops, an error occurred' });
            setTimeout(() => setState({ showToast: false }), 2000);
        },
        onclick: (e) => {
            e.preventDefault();
            const success = copee.toClipboard(url.href);
            if (success) {
                setState({ showToast: true, messageToast: 'Copied image URL to clipboard' });
                setTimeout(() => setState({ showToast: false }), 3000);
            }
            else {
                window.open(url.href, '_blank');
            }
            return false;
        }
    })), H(Toast, {
        message: messageToast,
        show: showToast,
    }));
};
R(H(App), document.getElementById('app'));
//# sourceMappingURL=index.js.map