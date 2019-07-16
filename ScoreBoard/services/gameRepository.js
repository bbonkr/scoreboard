import SQLite from 'react-native-sqlite-storage';
import { databaseInitializer } from './databaseInitializer';

export const gameRepository = () => {
    let databaseName = 'scoreboard';
    let database; // typeof SQLite.SQLiteDatabase

    const getDatabase = async () => {
        if (database === undefined) {
            await open();
        }
        return database;
    };

    const open = async () => {
        SQLite.DEBUG(true);
        SQLite.enablePromise(true);

        const databaseInstance = await SQLite.openDatabase({
            name: databaseName,
            location: 'default',
        });

        console.log('[DB] Database open.');

        database = databaseInstance;

        return databaseInstance;
    };

    const close = async () => {
        if (database === undefined) {
            console.log('[DB] Database is not opened. unable to close.');
        } else {
            const status = await database.close();
            console.log('[DB] Database was closed.');
            database = undefined;
        }
    };
    return {
        /**
         * 데이터베이스를 초기화합니다.
         */
        async init() {
            try {
                const db = await getDatabase();
                if (!db) {
                    throw new Error('[DB] Database does not initialize.');
                }
                console.log('[DB] Database initalize.');
                await databaseInitializer().update(db);
                console.log('[DB] Database initalized.');
            } catch (error) {
                console.error(error);
                throw error;
            } finally {
                close();
            }
        },

        /**
         * 경기 목록을 가져옵니다.
         * @param {Number} pageToken 목록의 마지막 Game.createdAt
         * @param {Number} pageSize 가져올 항목의 수
         *
         * @returns {Array} Array<Game> 경기 목록
         */
        async getGaems(pageToken = 0, pageSize = 10) {
            try {
                const db = await getDatabase();
                const result = await db.executeSql(
                    `
            SELECT 
                id,
                title,
                isClosed,
                isDeleted,
                closedAt,
                createdAt,
                updatedAt,
                deletedAt,
                teamAName,
                teamAScore,
                teamAColor,
                teamBName,
                teamBScore,
                teamBColor
            FROM
                Game
            WHERE
                isClosed <> 1
            AND createdAt < ?
            ORDER BY
                createdAt DESC
            LIMIT ?
            `,
                    [pageToken, pageSize],
                );

                return result.rows.map(v => {
                    return {
                        id,
                        title,
                        isClosed: !!v.isClosed,
                        isDeleted: !!v.isDeleted,
                        createdAt,
                        teamAName,
                        teamAScore,
                        teamAColor,
                        teamBName,
                        teamBScore,
                        teamBColor,
                    };
                });
            } catch (error) {
                console.error(error);
                throw error;
            } finally {
                close();
            }
        },

        /**
         * 경기 정보를 가져옵니다.
         * @param {Number} id 식별자 Game.id
         *
         * @returns {Game} game 경기
         */
        async findById(id = 0) {
            try {
                const db = await getDatabase();
                const result = await db.executeSql(
                    `SELECT 
                    id,
                    title,
                    isClosed,
                    isDeleted,
                    closedAt,
                    createdAt,
                    updatedAt,
                    deletedAt,
                    teamAName,
                    teamAScore,
                    teamAColor,
                    teamBName,
                    teamBScore,
                    teamBColor            
                FROM Game WHERE id = ?`,
                    [id],
                );

                const games = result.rows.map(v => {
                    return {
                        id,
                        title,
                        isClosed: !!v.isClosed,
                        isDeleted: !!v.isDeleted,
                        createdAt,
                        teamAName,
                        teamAScore,
                        teamAColor,
                        teamBName,
                        teamBScore,
                        teamBColor,
                    };
                });

                if (games && games.length > 0) {
                    return games[0];
                } else {
                    return null;
                }
            } catch (error) {
                console.error(error);
                throw error;
            } finally {
                close();
            }
        },

        async getGamesCount() {
            const database = await getDatabase();

            return 0;
        },

        /** return */
    };
};
