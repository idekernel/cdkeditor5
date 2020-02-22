import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertQuestionBoxCommand extends Command {
    execute() {
        this.editor.model.change( writer => {
            // Insert <questionBox>*</questionBox> at the current selection position
            // in a way that will result in creating a valid model structure.
            this.editor.model.insertContent( createQuestionBox( writer ) );
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;
        const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'questionBox' );

        this.isEnabled = allowedIn !== null;
    }
}

function createQuestionBox( writer ) {
    const questionBox = writer.createElement( 'questionBox' );
    return questionBox;
}