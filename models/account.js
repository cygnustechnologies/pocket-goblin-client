module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define("account", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    subtype: DataTypes.STRING,
    currentBalance: DataTypes.FLOAT,
    plaidAccountId: {
      type: DataTypes.STRING,
      unique: true
    }
  });

  Account.associate = models => {
    Account.belongsTo(models.Item);
    Account.hasMany(models.Transaction);
  };

  return Account;
};
