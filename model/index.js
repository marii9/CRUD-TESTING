const sequelize = require('../config/connection');
const Category = require('./Category');
const Product = require('./Product');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');



Category.hasMany(Product, {
    foreignKey: 'category_id',
    onDelete: 'CASCADE'
  });
  
  // Product belongs to Category
  Product.belongsTo(Category, {
    foreignKey: 'category_id'
  });
  
  // Product belongs to many Tag (through ProductTag)
  Product.belongsToMany(Tag, {
    through: ProductTag,
    foreignKey: 'product_id'
  });
  
  // Tag belongs to many Product (through ProductTag)
  Tag.belongsToMany(Product, {
    through: ProductTag,
    foreignKey: 'tag_id'
  });
  
  // ProductTag belongs to Product
  ProductTag.belongsTo(Product, {
    foreignKey: 'product_id'
  });
  
  // ProductTag belongs to Tag
  ProductTag.belongsTo(Tag, {
    foreignKey: 'tag_id'
  });
  
  module.exports = { Category, Product, ProductTag, Tag };