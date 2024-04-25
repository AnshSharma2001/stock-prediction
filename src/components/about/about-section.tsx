/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/Zchiad5UDXq
 */
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { TeamInfo } from "./team-info";

const imgFedURL = "https://images.unsplash.com/photo-1631216166880-9e9b51577962?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fHN0b2Nrc3xlbnwwfHwwfHx8MA%3D%3D";
const imgStockDefaultURL ="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; 



export function AboutSection() {
  return (
    <div className="flex flex-col pt-10">
      <div className="my-6 md:my-12 lg:my-16">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4 items-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Predicting the Future of Stocks
                </h2>
                <hr className="py-4" />

                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Our AI-driven platform provides accurate predictions and
                  insights into stock market trends. Make informed decisions and
                  maximize your investments with our powerful analysis tools.
                </p>
              </div>
              <Link
                className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                href="/dashboard"
              >
                Get Started
              </Link>
            </div>
            <div className="flex items-center justify-center">
              <Image
                alt="Hero"
                className="aspect-video overflow-hidden rounded-xl object-bottom"
                height="275"
                src={imgStockDefaultURL}
                width="550"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full py-12 lg:py-16">
        <div className="container grid-in-container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Meet the Team
              </h2>
              <hr className="py-4" />

              <p className="max-w-[800px] text-gray-500 md:text-xl dark:text-gray-400">
                Our team of experts brings years of experience in finance, data
                analysis, and machine learning to deliver the best insights for
                your investment decisions.
              </p>
            </div>
          </div>
          <TeamInfo />
        </div>
      </div>
      <div className="w-full py-12 lg:py-16">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <div className="mx-auto grid gap-6 lg:gap-12 items-start lg:max-w-[900px]">
              <div className="grid gap-2">
                <p className="text-sm font-medium tracking-wide uppercase text-gray-500 dark:text-gray-400">
                  March 16, 2023
                </p>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Making the Right Bets: How Our Predictions Help You Win in the
                  Stock Market
                </h2>
                <hr className="py-4" />
              </div>
              <Image
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-bottom"
                height="450"
                src={imgFedURL}
                width="900"
              />
              <div className="grid gap-4">
                <p className="text-lg leading-7 text-gray-600 md:text-xl dark:text-gray-300">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum. Lorem, ipsum dolor sit amet
                  consectetur adipisicing elit. Vero vel unde minus temporibus
                  tempore odio, illum velit id non sit, accusantium placeat,
                  nisi veritatis molestias totam debitis alias sapiente
                  quisquam?
                </p>
                <p className="text-lg leading-7 text-gray-600 md:text-xl dark:text-gray-300">
                  Dipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum. Lorem, ipsum dolor sit amet
                  consectetur adipisicing elit. Vero vel unde minus temporibus
                  tempore odio, illum velit id non sit, accusantium placeat,
                  nisi veritatis molestias totam debitis alias sapiente
                  quisquam?
                </p>
                <p className="text-lg leading-7 text-gray-600 md:text-xl dark:text-gray-300">
                  Sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                  ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis
                  aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum. Lorem, ipsum dolor sit
                  amet consectetur adipisicing elit. Vero vel unde minus
                  temporibus tempore odio, illum velit id non sit, accusantium
                  placeat, nisi veritatis molestias totam debitis alias sapiente
                  quisquam?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full py-12 lg:py-16">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <div className="grid gap-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Our Commitment to Excellence
              </h2>
              <hr className="py-4" />

              <p className="text-gray-500 dark:text-gray-400">
                We are dedicated to providing our users with the most accurate
                and insightful predictions to help them navigate the complex
                world of the stock market. Our team of experts leverages the
                latest technologies and data analysis tools to deliver
                high-quality forecasts and actionable insights. With our
                platform, you can make informed decisions and stay ahead of the
                market trends.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full py-12 lg:py-16">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <div className="grid gap-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                In the News
              </h2>
              <hr className="py-4" />
              <ul className="grid gap-6">
                <li className="grid gap-2">
                  <h3 className="text-2xl font-bold tracking-tighter sm:text-4xl">
                    The Future of Finance: How AI is Transforming Stock Market
                    Predictions
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </li>
                <li className="grid gap-2">
                  <h3 className="text-2xl font-bold tracking-tighter sm:text-4xl">
                    Uncovering Hidden Gems: The Rise of Small-Cap Stocks
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full py-12 lg:py-16">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <div className="grid gap-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Our Partners
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Trusted by the best in the industry. Our partners include...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
