export const ensureAdminIsInRoles = (req, res, next) => {
  if (req.user) {
    const requestor = req.user
    if (requestor.roles && Array.isArray(requestor.roles)) {
      const roles = requestor.roles
      if ((roles.find(role => role === 'admin')) !== undefined) {
        return next()
      }
    }
  }
  return res.status(403).end()
}