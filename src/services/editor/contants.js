import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import Warning from '@editorjs/warning';
import Header from '@editorjs/header';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import CheckList from '@editorjs/checklist';
import Delimiter from '@editorjs/delimiter';
import NestedList from '@editorjs/nested-list';

export const EDITOR_JS_TOOLS = {
    holder: 'editorjs',
    data: {},
    tools: {
        embed: Embed,
        table: Table, // TODO: Show to configure
        marker: Marker,
        list: NestedList,
        warning: Warning, // TODO: Show to configure
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
        checklist: CheckList, // TODO: Show to configure
        delimiter: Delimiter,
    },
    onChange: () => {

    }
};
