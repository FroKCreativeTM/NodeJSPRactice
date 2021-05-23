const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            name : {
                type : Sequelize.STRING(20),
                allowNull : false,
                unique : true,
            }, 
            age : {
                type : Sequelize.INTEGER.UNSIGNED,
                allowNull : false,
            },
            married : {
                type : Sequelize.BOOLEAN,
                allowNull : false,
            },
            comment : {
                type : Sequelize.TEXT,
                allowNull : true,
            },
            created_at : {
                type : Sequelize.DATE, 
                allowNull : false,
                defaultValue : Sequelize.NOW,
            },
        }, {
            sequelize,
            timestamps : false,
            underscored : false,
            modelName : 'User',
            tableName : 'users',
            paranoid : false,
            charset : 'utf8',
            collate : 'utf8_general_ci',
        });
    }
    static associate(db) {
        // 여기에 관계를 정의한다 (1:1 / 1:N) etc
        // 여기서는  1대 다이다.
        db.User.hasMany(db.Comment, { foreignKey : 'commenter', sourceKey : 'id' });
    }
}