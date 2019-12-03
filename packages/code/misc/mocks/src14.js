/**
 * ListScene
 * @class ListScene
 * @abstract
 */
'use strict'

const { hasMoreFor } = require('@the-/util-site')
const Scene = require('./Scene')

class ListSceneBase extends Scene {}

/** @lends ListScene */
class ListScene extends ListSceneBase {
  static qField = ['name']

  addFilter(filter = {}) {
    this.set({
      filter: {
        ...this.getFilter(),
        ...filter,
      },
    })
  }

  emptyList() {
    return { entities: [], meta: {} }
  }

  getCondition() {
    return {
      filter: this.getFilter(),
      page: this.getPage(),
      sort: this.getSort(),
    }
  }

  setQ(q) {
    this.set({ pageNumber: 1 })
    this.setFilterByQ(q, { fields: this.constructor.qField })
    this.replaceHistoryByQuery({ q })
  }

  async dealWith(condition) {
    throw new Error('Not implemented')
  }

  async doSync() {
    const { entities, meta: counts } = await this.dealWith(this.getCondition())
    this.set({ counts, entities, hasMore: hasMoreFor(counts) })
  }

  async doSyncBackground() {
    const isBusy = this.get('busy') || this.get('backgroundBusy')
    if (isBusy) {
      // TODO これだと取りこぼしがありそう
      return
    }
    this.set({ backgroundBusy: true })
    try {
      const { entities, meta: counts } = await this.dealWith(
        this.getCondition(),
      )
      this.set({ counts, entities, hasMore: hasMoreFor(counts) })
    } finally {
      this.set({ backgroundBusy: false })
    }
  }

  /**
   * Do sync for more
   * @returns {Promise<undefined>}
   */
  async doSyncMore() {
    this.set({ moreBusy: true })
    try {
      const pageNumber = this.get('pageNumber')
      this.set({ pageNumber: pageNumber + 1 })

      const condition = this.getCondition()
      const { entities, meta: counts } = await this.dealWith({
        ...condition,
        page: {
          number: 1,
          size: condition.page.number * condition.page.size,
        },
      })
      this.set({ counts, entities, hasMore: hasMoreFor(counts) })
      this.addEntities(entities)
    } finally {
      this.set({ moreBusy: false })
    }
  }

  async doSyncOne(id) {
    const {} = await this.dealWith({
      filter: { id },
      page: { number: 1, size: 1 },
    })
    if (one) {
      this.updateEntity(one)
    }
  }
}

module.exports = ListScene
