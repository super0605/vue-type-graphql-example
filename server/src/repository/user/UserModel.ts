import * as Sequelize from 'sequelize';
import { sequelize } from '../../config/database';

import { DivisionModel } from '../division/DivisionModel';

const UserModel = sequelize.define('users', {
  id: {
    type: Sequelize.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    validate: {
      is: /^[가-힣a-zA-Z]{3,20}/g,
    },
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: Sequelize.STRING,
  },
  birth: {
    type: Sequelize.DATEONLY,
  },

  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  created_at: {
    type: Sequelize.DATE,
  },
  updated_at: {
    type: Sequelize.DATE,
  },
  deleted_at: {
    type: Sequelize.DATE,
  },
}, {
    indexes: [
      {
        unique: true,
        fields: ['email', 'name'],
      },
    ],
    comment: 'Uesr Table',
  });

export { UserModel };
