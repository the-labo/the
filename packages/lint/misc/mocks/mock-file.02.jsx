const l = m => m
const msg1 = l('msg.SOME_MESSAGE_1')
const msg2 = l('msg.SOME_MESSAGE_2')

@l('msg.SOME_MESSAGE_1')
class Hoge {

}

const n = {
  m1: l['msg.SOME_MESSAGE_1'],
  m2: l['msg.SOME_MESSAGE_2'],
  m3: l.msg.a.b.c.d.SOME_MESSAGE_2,
}
