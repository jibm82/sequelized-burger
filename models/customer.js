module.exports = (sequelize, DataTypes) => {
  let Customer = sequelize.define("Customer", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Customer.associate = models => {
    Customer.hasMany(models.Burger, { onDelete: "cascade" });
  };

  return Customer;
};