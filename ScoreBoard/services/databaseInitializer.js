import SQLite from 'react-native-sqlite-storage';

export const databaseInitializer = () => {
    const getVersion = async transaction => {
        const resultSet = await transaction.executeSql(
            `
            SELECT 
                version 
            FROM 
                Version 
            ORDER BY 
                version DESC 
            LIMIT 1;
            `,
        );

        if (resultSet.rows && resultSet.rows.length > 0) {
            return resultSet.rows.item(0).version;
        } else {
            return 0;
        }
    };
    const createTables = async transaction => {
        throw new Error('throws at createTables');

        const dropAllTables = false;
        if (dropAllTables) {
            await transaction.executeSql(`DROP TABLE IF EXISTS Game;`);
            await transaction.executeSql(`DROP TABLE IF EXISTS Version;`);
        }

        // game table
        await transaction.executeSql(`CREATE TABLE IF NOT EXISTS Game (
            id          INTEGER PRIMARY KEY NOT NULL    AUTOINCREMENT,
            title       TEXT                NOT NULL,
            isClosed    INTEGER             NOT NULL    DEFAULT 0,
            isDeleted   INTEGER             NOT NULL    DEFAULT 0,
            closedAt    INTEGER             NULL,
            createdAt   INTEGER             NOT NULL,
            updatedAt   INTEGER             NULL,
            deletedAt   INTEGER             NULL,
            teamAName   TEXT                NOT NULL,
            teamAScore  INTEGER             NOT NULL    DEFAULT 0,
            teamAColor  TEXT                NOT NULL,
            teamBName   TEXT                NOT NULL,
            teamBScore  INTEGER             NOT NULL    DEFAULT 0,
            teamBColor  TEXT                NOT NULL
        );`);

        // version table
        await transaction.executeSql(`CREATE TABLE IF NOT EXISTS Version (
            id          INTEGER PRIMARY KEY NOT NULL    AUTOINCREMENT,
            version     INTEGER             NOT NULL
        );`);
    };
    const seedVersion1 = async transaction => {
        // seed data
        await transaction.executeSql(
            `INSERT INTO Game (
            title,
            isClosed,
            isDeleted,
            createdAt,
            teamAName,
            teamAScore,
            teamAColor,
            teamBName,
            teamBScore,
            teamBColor
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                'Sample game',
                0,
                0,
                +new Date(),
                'Team #1',
                0,
                'red',
                'Team #2',
                0,
                'blue',
            ],
        );
        // set version
        await transaction.executeSql(
            `INSERT INTO Version (version) values (?);`,
            [1],
        );
    };
    return {
        async update(database) {
            console.log('Database initialize. ');

            await database.transaction(createTables);

            const version = database.transaction(getVersion);

            if (version < 1) {
                await database.transaction(seedVersion1);
                // await seedVersion1();
            }
        },
    };
};
