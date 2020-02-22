import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import InsertQuestionBoxCommand from './insertquestionboxcommand';
import { toWidget } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';

export default class QuestionBoxEditing extends Plugin {
    static get requires() {
        return [ Widget ];
    }

    init() {

        console.log( 'QuestionBoxEditing#init() got called' );

        this._defineSchema();
        this._defineConverters();

        this.editor.commands.add( 'insertQuestionBox', new InsertQuestionBoxCommand( this.editor ) );
    }

    _defineSchema() {
        const schema = this.editor.model.schema;

        schema.register( 'questionBox', {
            // Behaves like a self-contained object (e.g. an image).
            isObject: true,

            // Allow in places where other blocks are allowed (e.g. directly in the root).
            allowWhere: '$block'
        } );

    }

    _defineConverters() {
        const conversion = this.editor.conversion;

        // <questionBox> converters
        conversion.for( 'upcast' ).elementToElement( {
            model: 'questionBox',
            view: {
                name: 'div',
                classes: 'question-box'
            }
        } );
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'questionBox',
            view: {
                name: 'div',
                classes: 'question-box'
            }
        } );
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'questionBox',
            view: ( modelElement, viewWriter ) => {
                const section = viewWriter.createContainerElement( 'div', { class: 'question-box' } );

                return toWidget( section, viewWriter, { label: 'question box widget' } );
            }
        } );
    }
}