function syncSleep(time) {
  const start = new Date().getTime()
  while (new Date().getTime() - start < time) {
    // console.log('success')
  }
  return 'after' + (Date.now() - start)/1000 + 's'
}