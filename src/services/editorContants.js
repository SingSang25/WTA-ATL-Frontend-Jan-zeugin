import Embed from '@editorjs/embed';
import Header from '@editorjs/header';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import Delimiter from '@editorjs/delimiter';
import NestedList from '@editorjs/nested-list';

export const EDITOR_JS_TOOLS = {
    holder: 'editorjs',
    data: {},
    tools: {
        embed: Embed,
        marker: Marker,
        list: NestedList,
        header: {
            class: Header,
            inlineToolbar: ['link'],
            config: {
                placeholder: 'Enter a header',
                levels: [2, 3, 4, 5, 6],
                defaultLevel: 3,
            },
        },
        quote: Quote,
        delimiter: Delimiter,
    },
    onChange: () => {

    }
};
