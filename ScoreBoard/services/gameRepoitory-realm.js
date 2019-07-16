import Realm from 'realm';

const GameSchema = {
    name: 'Game',
    primaryKey: 'id',
    properties: {
        id: { type: 'int', optional: false },
        title: { type: 'string', optional: false },
        isClosed: { type: 'bool', optional: false, default: false },
        isDeleted: { type: 'bool', optional: false, default: false },
        closedAt: { type: 'int', optional: true },
        createdAt: { type: 'int', optional: false },
        updatedAt: { type: 'int', optional: true },
        deletedAt: { type: 'int', optional: true },
        teamAName: { type: 'string', optional: false },
        teamAScore: { type: 'int', optional: false, default: 0 },
        teamAColor: { type: 'string', optional: false },
        teamBName: { type: 'string', optional: false },
        teamBScore: { type: 'int', optional: false, default: 0 },
        teamBColor: { type: 'string', optional: false },
    },
};

export const gameRepository = () => {
    const open = async () => {
        const realm = await Realm.open({
            schema: [GameSchema],
            schemaVersion: 4,
            migration: (oldRealm, newRealm) => {
                const oldGame = oldRealm.objects('Game');
                const newGame = newRealm.objects('Game');
            },
            deleteRealmIfMigrationNeeded: false, // !! Developement only
        });

        return realm;
    };
    const seedSampleData = realm => {
        const count = realm.objects('Game').length;
        if (!count) {
            const addedItems = [];
            const seedData = new Array(50).fill(1, 50).forEach(v => {
                realm.write(() => {
                    const addedItem = realm.create('Game', {
                        title: 'Sample Game',
                        createdAt: +new Date(),
                        teamAName: 'Team #1',
                        teamAColor: 'red',
                        teamBName: 'Team #2',
                        teamBColor: 'blud',
                    });
                    addedItems.push(addedItem);
                });
            });
        }
    };
    return {
        async getGames(pageToken = 0, pageSize = 10) {
            const realm = await open();
            const games = realm.objects('Game');

            let predicate = 'isDeleted != true';
            if (pageToken > 0) {
                predicate = `${predicate} AND createdAt < $0`;
            }
            return games
                .filtered(predicate, pageToken)
                .sorted('createdAt', true)
                .slice(0, pageSize);
        },
        async findById(id) {
            const realm = await open();
            const games = realm.objects('Game');
            const filteredGames = games.filtered('id == $0', id);
            if (filteredGames.length === 0) {
                return null;
            } else {
                return filteredGames[0];
            }
        },
        async getGamesLatest(pageToken = 0) {
            // 신규 입력 후 목록 갱신
            const realm = await open();
            const games = realm.objects('Game');
            return games
                .filtered('createdAt > $0 AND isDeleted != true', pageToken)
                .sorted('createdAt', true);
        },
        async addItem(game) {
            const realm = await open();
            const maxId = realm.objects('Game').max('id');

            try {
                realm.write(() => {
                    realm.create('Game', {
                        ...game,
                        id: (maxId || 0) + 1,
                        createdAt: +new Date(),
                    });
                });
            } catch (e) {
                console.error(e);
                throw e;
            }
        },
        async updateItem(game) {
            const realm = await open();
            try {
                realm.write(() => {
                    realm.create(
                        'Game',
                        {
                            ...game,
                            updatedAt: +new Date(),
                            closedAt: isClosed ? +new Date() : null,
                        },
                        true,
                    );
                });
            } catch (e) {
                console.error(e);
                throw e;
            }
        },

        async deleteItem(game) {
            const realm = await open();
            try {
                realm.write(() => {
                    // realm.delete(game);
                    realm.create('Game', {
                        ...game,
                        isDeleted: true,
                        deletedAt: +new Date(),
                    });
                });
            } catch (e) {
                console.error(e);
                throw e;
            }
        },
    };
};
