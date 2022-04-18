import { assert } from 'chai';
import { v4, validate as validateUUID } from 'uuid';
import { Note } from '../../src/models/Note';

suite('Testing Note Model', function () {
    test('Should instanciar corretily', () => {
        const note = new Note(
            'Note Model test',
            'Testing the constructor inicitialize',
        );

        assert.propertyVal(note, 'title', 'Note Model test');
        assert.propertyVal(
            note,
            'description',
            'Testing the constructor inicitialize',
        );
        assert.isTrue(validateUUID(note.id));
    });

    test('Should serialize correctily', () => {
        const note = new Note(
            'Note Model test',
            'Testing the constructor inicitialize',
        );

        assert.equal(note.to_JSON(), JSON.stringify(note));
    });

    test('Should build a note from JSOn correctily', () => {
        const note = new Note(
            'Note Model test',
            'Testing the constructor inicitialize',
            v4(),
        );
        const noteJSON = JSON.stringify(note);
        const { id, title, description } = Note.from_JSON(noteJSON);

        assert.equal(id, note.id);
        assert.equal(title, note.title);
        assert.equal(description, note.description);
    });

    test('Should handle notes equalies', () => {
        const id = v4();
        const note = new Note(
            'Note Model test',
            'Testing the constructor inicitialize',
            id,
        );
        const copyNote = new Note(
            'Note Model test',
            'Testing the constructor inicitialize',
            id,
        );

        assert.isTrue(note.equals(copyNote));
    });
});
