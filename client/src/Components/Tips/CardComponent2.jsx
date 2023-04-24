import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";

import { StarIcon } from "@heroicons/react/24/solid";
import { tipsData } from "../../assets/tips";
export default function Example() {
  return (
    <div className="flex justify-center pt-4">
      <Card color="transparent" shadow={false} className="w-full max-w-[26rem]">
        <CardHeader
          color="transparent"
          floated={false}
          shadow={false}
          className="mx-0 flex items-center gap-4 pt-0 pb-8"
        >
          {/* <Avatar
            size="lg"
            variant="circular"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            alt="candice wu"
          /> */}
          <div className="flex w-full flex-col gap-0.5">
            <div className="flex items-center justify-between w-full overflow-hidden ">

              <Typography variant="h5" color="blue-gray">
                {tipsData.map((data, key) => {
                  return (
                    <>
                      <div class="flex transition-transform ease-out duration-500 overflow-x-auto style=
            bm-5 text-m font-bold tracking-tight text-gray-900 dark:text-white bg-white border border-gray-200 rounded-lg shadow
            hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div key={key} className="">{data.tipType}</div>
                        <div key={key} className="">{data.description}</div>
                      </div>

                      
                    </>
                  );
                })}
              </Typography>

            </div>
            <Typography color="blue-gray">Frontend Lead @ Google</Typography>
          </div>
        </CardHeader>
        <CardBody className="mb-6 p-0">
          <Typography>
          </Typography>
        </CardBody>
      </Card>
    </div>
  );
}