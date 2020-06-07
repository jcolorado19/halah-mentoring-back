const express = require('express');
const passport = require('passport');
const ResourcesService = require('./service');

require('../../utils/auth/strategies/jwt');

function resourcesApi(app) {
  const router = express.Router();
  const resourcesService = new ResourcesService();

  app.use('/v1/resources', router);

  router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    async function (req, res, next) {
      try {
        const { categories } = req.query;
        const resources = await resourcesService.getResources({ categories });

        res.status(200).json({
          data: resources,
          message: 'resources retrieved',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.get(
    '/:resourceId',
    passport.authenticate('jwt', { session: false }),
    async function (req, res, next) {
      try {
        const { resourceId } = req.params;
        const resource = await resourcesService.getResource(resourceId);
        res.status(200).json({
          data: resource,
          message: 'resource retrieved',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    async function (req, res, next) {
      try {
        const resources = req.body;
        const createdResourceId = await resourcesService.createResource(resources);
        res.status(200).json({
          data: createdResourceId,
          message: 'resources retrieved',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.patch(
    '/:resourceId',
    passport.authenticate('jwt', { session: false }),
    async function (req, res, next) {
      try {
        const { resourceId } = req.params;
        const resource = req.body;
        const updatedResourceId = await resourcesService.updateResource({ resourceId, resource })
        res.status(200).json({
          data: updatedResourceId,
          message: 'resource updated',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/:resourceId',
    passport.authenticate('jwt', { session: false }),
    async function (req, res, next) {
      try {
        const { resourceId } = req.params;
        const deletedResourceId = await resourcesService.deleteResource(resourceId);
        res.status(200).json({
          data: deletedResourceId,
          message: 'resource deleted',
        });
      } catch (err) {
        next(err);
      }
    }
  );

}

module.exports = resourcesApi;
