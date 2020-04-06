const timeNow = new Intl.DateTimeFormat('en', {
  hour12: false,
  year: 'numeric',
  month: 'short',
  day: '2-digit',
  hour: 'numeric',
  minute: '2-digit'

}).format(Date.now())

module.exports = timeNow