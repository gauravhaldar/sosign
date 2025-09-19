"use client";

import React from 'react';
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 md:px-6 lg:px-8 bg-white shadow-lg rounded-xl mt-8 mb-12">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-10 text-center text-gray-900 leading-tight">
        Privacy Policies of Sosign
      </h1>

      <div className="space-y-6 text-gray-700 leading-relaxed">
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">Information collection and Uses</h2>
        <p>
          When you become member of our site you are providing your information like name, email, social media account, photo which will use as a profile picture id to us. We are sole owner of the information and we will not share, sell and rent your information with anyone. We may share the information on agreed basis.
        </p>
        <p>
          When you sign in our website we are asking your name and other information of which some is not mandatory. But we request you to give all your details correctly so that we can give you the better experience and service.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">Use of cookies</h2>
        <p>
          Cookie is nothing but the data about user which is stored on the personal hard drive. It is not linked with our hosting site. Once you close your browser your cookies will get terminated unless you order the device to save the cookie. If you save the cookie it will get easier and less time consuming when next time you are logging in our website. If you do not want to save the cookie you are still our honourable member. Cookies can also track the targets in which you are more interested and provide quick update link regarding the same. If you want us to remember your cookie please tick on remember at the time of logging in. If you do not want us to remember the cookie then please uncheck the remember option given for it.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">Ad services</h2>
        <p>
          Some user information is collected by third-party ad services. Users always have a choice of whether to supply this information to third party. The information collected without user’s knowledge. We do not have any control in such type of information sharing which are supplied by the user himself. Such type of information can be used by the third parties according to their privacy policies. We have control only the personal information is not misused by our side. Still we are forcing the users to be concerned about our personal information and not to give it to any website with which you are not familiar with. If found information is misused user s are free to contact us (info@sosign.com).
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">Changes</h2>
        <p>
          Our policies may change time to time and it will update on our websites privacy page. We request you to check often the terms and policies. If you have any query regarding any point you can connect with us by our contact us page.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">Correction or Updating personal information:</h2>
        <p>
          If user want to change any personal information or no longer desires our service, we will provide the correct way to remove or update data shared with us. This can be done on the users membership page in settings or email our customer service about the same.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">Correction in petition:</h2>
        <p>
          If user want to make some changes in his petition user can do so by logging in his account and do the changes in the way user wants to do. The information you are going to update should be obvious to follow all the terms and policies mentioned. Otherwise the data will not get changed.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">How to contact us:</h2>
        <p>
          The best way to get in touch with us is to email.
          We would love to hear your questions, concerns, and feedback about our website. If you have any suggestions for us, feel free to let us know by Contact Us at info@sosign.com.
        </p>
        <p className="text-center text-lg font-bold mt-10 text-blue-600">
          Thanks for supporting our website. We are looking ahead to see the change made by you to make our country better!!
        </p>
      </div>
    </div>
  );
}
