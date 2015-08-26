describe 'ndoo framework test >', ->
  describe 'storage test >', ->
    _stor = undefined

    beforeAll ->
      _stor = ndoo.storage

    it 'ndoo.storage should deinfe', ->
      expect(_stor).toBeDefined()

    it 'get abc, should be undefined', ->
      expect(_stor('abc')).toBeUndefined()

    describe 'set value >', ->
      it 'set abc to 123, should be 123', ->
        expect(_stor('abc', 123)).toBe 123

      it 'get abc after set, should be 123 ', ->
        expect(_stor('abc')).toBe 123

    describe 'rewrite >', ->
      it 'rewrite abc without option, should be false', ->
        expect(_stor('abc', 456)).toBe false
      it 'get abc after rewrite, should be 123', ->
        expect(_stor('abc')).toBe 123

      it 'rewrite abc add option, should be Truthy', ->
        expect(_stor 'abc', 456, _stor.REWRITE).toBeTruthy()
      it 'get abc after rewrite, should be 456', ->
        expect(_stor('abc')).toBe 456

    describe 'destroy >', ->
      it 'remove abc for storage, should be true', ->
        expect(_stor('abc', null, _stor.DESTROY)).toBe true

      it 'get abc for storage, should be undefined', ->
        expect(_stor('abc')).toBeUndefined()

  describe 'block test >', ->
    _n = undefined
    beforeAll ->
      _n = ndoo

    it 'has block should false', ->
      expect(_n.hasBlock 'test').toBeUndefined()

    it 'get block should false', ->
      expect(_n.block 'test').toBe false

  describe 'getPk test >', ->
    _n = undefined

    beforeAll ->
      _n = ndoo

    it 'getPk should match num', ->
      expect(_n.getPk()).toMatch /^\d+$/

    it 'getPk should prefix', ->
      expect(_n.getPk('test_')).toMatch /^test_\d+$/


  describe 'page id test >', ->
    _n = ndoo

    it 'get page id should be empty', ->
      expect(_n.pageId).toBe ''

    describe 'init call', ->
      beforeAll ->
        spyOn(_n, 'initPageId').and.callThrough()
        _n.init 'home/index'

      it 'initPageId should be call', ->
        expect(_n.initPageId).toHaveBeenCalled()

      it 'initPageId param should be home/index', ->
        expect(_n.initPageId).toHaveBeenCalledWith 'home/index'

      it 'pageId should be home/index', ->
        expect(_n.pageId).toBe 'home/index'

  describe 'event test >', ->
    _n = ndoo

    describe 'default event >', ->
      defaultEvent1 = jasmine.createSpy 'defaultEvent1'

      it 'defaultEvent1 not be call', ->
        _n.on 'defaultTest', defaultEvent1
        expect(defaultEvent1).not.toHaveBeenCalled()

      it 'trigger event default event should be call', ->
        _n.trigger 'defaultTest'
        expect(defaultEvent1).toHaveBeenCalled()

      it 'again trigger default event call count should be 2', ->
        _n.trigger 'defaultTest'
        expect(defaultEvent1.calls.count()).toEqual 2

    describe 'delay event >', ->
      delayEvent1 = jasmine.createSpy 'delayEvent1'

      it 'before event callback should be call', ->
        _n.trigger 'DELAY:delayTest', 'trigger 1'
        _n.on 'delayTest', delayEvent1
        expect(delayEvent1).toHaveBeenCalled()

      it 'again trigger, event callback call count should be 2', ->
        _n.trigger 'DELAY:delayTest', 'trigger 2'
        # console.log _n.event.eventHandle.events['delayTest']
        expect(delayEvent1.calls.count()).toEqual 2

      it 'again bind callback call count should be 2', ->
        delayEvent2 = jasmine.createSpy 'delayEvent2'
        _n.on 'delayTest', delayEvent2
        expect(delayEvent2.calls.count()).toEqual 2

      xit 'return false again bind should not call', ->
        delayEvent3 = jasmine.createSpy('delayEvent3').and.returnValue false
        delayEvent4 = jasmine.createSpy 'delayEvent4'
        _n.trigger 'DELAY:delayTest2'
        _n.on 'delayTest2', delayEvent3
        _n.on 'delayTest2', delayEvent4
        expect(delayEvent3).toHaveBeenCalled()
        expect(delayEvent4).not.toHaveBeenCalled()

    describe 'status event >', ->
      statusEvent1 = jasmine.createSpy 'statusEvent1'
      statusEvent2 = jasmine.createSpy 'statusEvent2'

      it 'before status event should be call', ->
        _n.on 'statusTest', statusEvent1
        _n.trigger 'STATUS:statusTest'
        expect(statusEvent1).toHaveBeenCalled()

      it 'before status event call count should be 1', ->
        expect(statusEvent1.calls.count()).toEqual 1

      it 'after status should be call', ->
        _n.on 'statusTest', statusEvent2
        expect(statusEvent2).toHaveBeenCalled()

      it 'again trigger status event call count should be 1', ->
        _n.trigger 'STATUS:statusTest'
        expect(statusEvent1.calls.count()).toEqual 1

  xdescribe 'ndoo call test >', ->
    _n = ndoo

    it 'initPageId should be call', ->
      spyOn _n, 'initPageId'
      # spyOn _n, 'init'
      # _n.init 'home/index'
      # console.log _n.pageId
      expect(_n.initPageId).toHaveBeenCalled()

    # describe 'main block >', ->
    #
    #   describe 'ui.checkinDate >', ->
    #     uiCheckinDate = undefined
    #     beforeAll ->
    #       uiCheckinDate = _n.block 'ui.checkinDate'
    #
    #     it 'has uiCheckinDate', ->
    #       expect(uiCheckinDate).toBeTruthy()
    #
    #     it 'test convertDate', ->
    #       date = new Date(2015, 6, 22)
    #       convDateTime = uiCheckinDate.convertDate('2015-07-22').getTime()
    #       expect(convDateTime).toBe date.getTime()
    #
    #     it 'test dateAddDay', ->
    #       date = new Date(2015, 6, 27)
    #       date2Time = uiCheckinDate.dateAddDay('2015-07-22', 5).getTime()
    #       expect(date2Time).toBe date.getTime()
