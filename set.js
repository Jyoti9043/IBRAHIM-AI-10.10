qconst fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNk1uSmdCU3dkWGFLQkFyUUlhUVU0UEEwaFplSUYvWUdWdktMY0dzalMzQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZWFpNTRYSUJHalpQVWZxdXVqdTNnSDVpRnlmUndQZnRuNndKQjBmMGFIZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJS2ZCQ1BDR3VObUFZNnBXNWVwdmlIbHBDVFFtUW54d3dxNldkK3dYWjBBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJb3huSUo3Y0o2UmNTVFFOcktSZTRyOUFza2R4K1h6MWxuOG5nNVZZQVFvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlHcVpnbTlNRjZ3Wm1neVlRSm5TbXlwNjdjZWx3VVZ1TzgvREtCWm4zMmc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlZ0Z21yd2trU3BoUHFaTTBJRlNFN0d6Rk9Yd2ZiQ29vaHJQLzRvcWtDeUk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV080eXE3NjZzWFZlMnExcGQ5cmgrWmpZbDlTODZJYTR0eDlHN0piaTZGZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0x6aE5uSFdseDhOeWVZM0IwSDc0SjFnM1MwZ2RmMnhEa3VobnZSM0NtWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlcxcUJIVkZ4Q3FudnhFRkkydTlxNS9qMVk3dkJoTWRNMkpaT21Lc05hOEh5d2NCZWF4RHhtZ1ZqU1orOVl0TGdGenViMGlidzAxOFdWVVN0bHFYamlBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NjgsImFkdlNlY3JldEtleSI6IkEzbTNSVVBVbkVmalpQa0xTbjNCT2xISjVyWk9td0c2bEloUFk2cFBwU0k9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6ImdUaWlWVG85VFplb25kTm51VXZibmciLCJwaG9uZUlkIjoiZjJhOTIwNGMtZDI5NS00N2Q3LTk1YWQtOGM4NDk5ZDE4ZjRiIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktEcmY4WnlVbG1NVFVFUU5xZzMvcHU5bmIyOD0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0anQxZjRsQXZlNk1SWFovM0s3cXFXZmNpYk09In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiWkxRQUxZQ0siLCJtZSI6eyJpZCI6IjkxODEzMzA5ODY5MzoyNUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLZg9mEINmE2K3YuNipINmF2YYg2K3Zitin2KrZiiDZh9mKINio2KfYs9mF2YMifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ05yTTRONEhFSXVkL0xFR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjduUnphLzVnOWdSWjJDQTA0T2wzTHJKMmdDZE8wb3pkTW9ZK0ZtQUNSRzg9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImV3MlFrbDNwcW45a3hORk0xK0IzZnZJcHliT1F1V1hEMGxVODFrN1BQSUF6d0MwUzZlVU1HTEtQdi8rQi8yRHNRaU9UUVBtYjFRUnRtS2ZPV0RZSkJBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJHUTJIR1VDQ2pzcEJtN2hTSXRub2hTbTE3dGUvSUk2eVBvT2lsM2NuNEVmMkhVNGZoWlRCRnIraGxmcklNWEJGMGU0QnBkOTI0QVJKT1V0b3ova1RnQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkxODEzMzA5ODY5MzoyNUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJlNTBjMnYrWVBZRVdkZ2dOT0RwZHk2eWRvQW5UdEtNM1RLR1BoWmdBa1J2In19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzE1NDA4NTM1fQ==',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || " Nabajyoti sigma",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "8133098693",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BMW MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/071f797dda6aef5ae3877.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
