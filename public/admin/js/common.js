function serializeToJson(form) {
  const result = {}
  // [{name: 'email', value: '用户输入的内容'}, {name: 'password'}]
  const f = form.serializeArray()
  f.forEach((item) => {
    result[item.name] = item.value
  })
  return result
}