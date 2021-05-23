const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
    static init(sequelize) {
        return super.init ({
            comment : {
                type : Sequelize.STRING(100),
                allowNull : false,
            },
            create_at : {
                type : Sequelize.DATE,
                allowNull : true,
                defaultValue : Sequelize.NOW,
            },
        }, {
            sequelize,
            timestamps : false,
            modelName : 'Comment',
            tableName : 'comments',
            paranoid : false,
            charset : 'utf8mb4',
            collate : 'utf8mb4_general_ci',
        });
    }

    static associate(db) {
        // 이 테이블은 하나의 유저에게 많은 코멘트가 종속되는 방식이다.
        db.Comment.belongsTo(db.User, { foreignKey : 'commenter', targetKey : 'id' });
    }
}