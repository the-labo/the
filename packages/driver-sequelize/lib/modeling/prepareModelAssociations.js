'use strict'

const associateForSchema = async (Model, schema, { models }) => {
  for (const [name, def] of Object.entries(schema)) {
    const { associate } = def
    if (!associate) {
      continue
    }

    const [associateName, associateOpt = {}] = [].concat(associate)
    const belongingModel = models[associateName]
    if (!belongingModel) {
      throw new Error(`[@the-/db] invalid associate ${name}: ${associateName}`)
    }

    Model.belongsTo(belongingModel, {
      as: associateOpt.as,
      foreignKey: { name },
    })
    await Model.sync()
  }
}

async function prepareModelAssociations(models, schemas) {
  for (const [modelName, schema] of Object.entries(schemas)) {
    await associateForSchema(models[modelName], schema, { models })
  }
}

module.exports = prepareModelAssociations
