module.exports = function(sequelize, DataTypes) {
    const Event = sequelize.define("Event", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1,100]
        }
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      }
    });
  
    Event.associate = function(models) {
      // Event should belong to user
      // A Post can't be created without an Author due to the foreign key constraint
      Event.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Event;
  };
  