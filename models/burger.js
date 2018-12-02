module.exports = (sequelize, DataTypes) => {
  let Burger = sequelize.define("Burger", {
    burger_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    devoured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

  Burger.associate = models => {
    Burger.belongsTo(models.Customer);
  };

  return Burger;
};