module.exports = (sequelize, DataType) => {
  const Test = sequelize.define("Test", {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    local: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    ip: {
      type: DataType.STRING,
      allowNull: true,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    // type: {
    //   type: DataType.ENUM("entrance", "exit"),
    //   allowNull: false,
    //   validate: {
    //     notEmpty: true
    //   }
    // },
    createdBy: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    updatedBy: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    isActive: {
      type: DataType.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  }, {
      timestamps: true
    }
  );

  return Test;
};