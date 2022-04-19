import { assert } from 'chai';
import { Note } from '../../src/models/Note';

import LevelNoteRepository, {
    levelDB,
} from '../../src/repository/LevelNoteRepository';

process.env.LEVELDB_LOCATION = 'notes.level.test';

suite('Testing levelDB Repository', function () {
    const noteRepository = new LevelNoteRepository();

    suiteTeardown(async function closeDB() {
        await levelDB.close();
    });

    teardown(async function () {
        await levelDB.clear();
    });

    test('Should clear database', async () => {
        const note1 = new Note('Note Test', 'Testing Level DB Repository');
        const note2 = new Note('Note Test 2', 'Testing Level DB Repository 2');
        await levelDB.batch([
            {
                type: 'put',
                key: note1.id,
                value: note1,
            },
            {
                type: 'put',
                key: note2.id,
                value: note2,
            },
        ]);
        await noteRepository.clear();

        const notes = await levelDB.values().all();

        assert.isFalse(!!notes.length);
    });

    test('Should save a note', async () => {
        const newNote = new Note('Note Test', 'Testing Level DB Repository');
        const note = await noteRepository.create(newNote);

        assert.isTrue(newNote.equals(note));
    });

    test('Should get a note by its id', async () => {
        const newNote = new Note('Note Test', 'Testing Level DB Repository');
        await levelDB.put(newNote.id, newNote);

        const note = await noteRepository.find(newNote.id);

        assert.isTrue(newNote.equals(note));
    });

    test('Should list notes', async () => {
        const note1 = new Note('Note Test', 'Testing Level DB Repository');
        const note2 = new Note('Note Test 2', 'Testing Level DB Repository 2');
        await levelDB.batch([
            {
                type: 'put',
                key: note1.id,
                value: note1,
            },
            {
                type: 'put',
                key: note2.id,
                value: note2,
            },
        ]);

        const notes = await noteRepository.list();

        assert.equal(notes.length, 2);
    });

    test('Should update a note by its id', async () => {
        const newNote = new Note('Note Test', 'Testing Level DB Repository');
        await levelDB.put(newNote.id, newNote);

        newNote.description = 'Note Test Updated!';

        const note = await noteRepository.update(newNote.id, newNote);

        assert.isTrue(newNote.equals(note));
    });

    test('Should delete a note by its id', async () => {
        const newNote = new Note('Note Test', 'Testing Level DB Repository');
        await levelDB.put(newNote.id, newNote);

        const note = await noteRepository.delete(newNote.id);
        const deletedNote = await noteRepository.find(newNote.id);

        assert.isTrue(newNote.equals(note));
        assert.isUndefined(deletedNote);
    });
});
