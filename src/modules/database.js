import config from 'config';
import Sequelize from 'sequelize';

// configure database
const sequelize = new Sequelize(
    config.get('database').database,
    config.get('database').user,
    config.get('database').password, {
        host: config.get('database').host,
        dialect: 'mysql',
        dialectOptions: {
            charset: 'utf8',
        },
        logging: false
    }
);

// test connection
sequelize.authenticate().then(() => {
    console.log('Database connected');
}).catch((error) => {
    console.error('Database connection error:', error);
});

const Guild = sequelize.define('guild', {
    id: { type: Sequelize.STRING, primaryKey: true },
    sub_id: { type: Sequelize.STRING },
    ping_id: { type: Sequelize.STRING },
    notice_id: { type: Sequelize.STRING },
    notice_msg: { type: Sequelize.STRING },
    timer_id: { type: Sequelize.STRING },
    prefix: { type: Sequelize.STRING }
}, {
    timestamps: false
});

const Avatar = sequelize.define('avatar', {
    id: { type: Sequelize.STRING, primaryKey: true },
    mercEars: { type: Sequelize.STRING },
    selectedItems: { type: Sequelize.TEXT },
    skin: { type: Sequelize.STRING }
}, {
    timestamps: false
});

export { Guild, Avatar };