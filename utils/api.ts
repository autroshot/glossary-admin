import { Controller } from '@/types/controller';
import { NextApiRequest, NextApiResponse } from 'next';

const controllerSwitch: ControllerSwitch = async (
  req,
  res,
  controllerByMethod
) => {
  const { POSTController, GETController, PUTController, DELETEController } =
    controllerByMethod;

  switch (req.method) {
    case 'POST':
      if (!POSTController) {
        res.status(405).end();
        break;
      }
      await POSTController(req, res);
      break;

    case 'GET':
      if (!GETController) {
        res.status(405).end();
        break;
      }
      await GETController(req, res);
      break;

    case 'PUT':
      if (!PUTController) {
        res.status(405).end();
        break;
      }
      await PUTController(req, res);
      break;

    case 'DELETE':
      if (!DELETEController) {
        res.status(405).end();
        break;
      }
      await DELETEController(req, res);
      break;

    default:
      res.status(405).end();
      break;
  }
};

function handleErrorDecorator(
  controllerSwitch: ControllerSwitch
): ControllerSwitch {
  return async (req, res, controllerByMethod) => {
    try {
      await controllerSwitch(req, res, controllerByMethod);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: '서버에 오류가 발생했습니다.' });
    }
  };
}

type ControllerSwitch = (
  req: NextApiRequest,
  res: NextApiResponse,
  controllerByMethod: ControllerByMethod
) => Promise<void>;

interface ControllerByMethod {
  POSTController?: Controller;
  GETController?: Controller;
  PUTController?: Controller;
  DELETEController?: Controller;
}

const decoratedControllerSwitch = handleErrorDecorator(controllerSwitch);

export { decoratedControllerSwitch as controllerSwitch };
