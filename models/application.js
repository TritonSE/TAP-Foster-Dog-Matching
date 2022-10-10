const mongoose = require("mongoose");

const { Schema } = mongoose;

/**
 * Application Model
 */
module.exports = mongoose.model(
  "Application",
  new Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        required: true,
      },
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      address: {
        addressOne: {
          type: String,
          required: true,
        },
        addressTwo: {
          type: String,
          required: false,
        },
        city: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          required: true,
        },
        zipcode: {
          type: Number,
          required: true,
        },
      },
      email: {
        type: String,
        required: true,
      },
      dateOfBirth: {
        type: String,
        required: true,
      },
      homeType: {
        type: String,
        required: true,
      },
      landlord: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: false,
        },
        phone: {
          type: String,
          required: false,
        },
        email: {
          type: String,
          required: false,
        },
      },
      fosterInfo: {
        restrictions: {
          type: String,
          required: true,
        },
        sleepLocation: {
          type: String,
          required: true,
        },
        hoursAtHome: {
          type: String,
          required: true,
        },
        typicalDay: {
          type: String,
          required: true,
        },
        primaryCaregiver: {
          type: String,
          required: true,
        },
        othersOnboard: {
          type: String,
          required: true,
        },
        permissionToVisit: {
          type: Boolean,
          required: true,
        },
        pastExperience: {
          type: String,
          required: true,
        },
        whyFoster: {
          type: String,
          required: true,
        },
        oneMonthCommitment: {
          type: String,
          required: true,
        },
        sizeOfDog: {
          type: [String],
          required: true,
        },
        ageOfDog: {
          type: [String],
          required: true,
        },
      },
      reference: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
        phone: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        relation: {
          type: String,
          required: true,
        },
        yearsKnown: {
          type: Number,
          required: true,
        },
      },
      otherInfo: {
        howDidYouHearAboutTAP: {
          type: String,
          required: true,
        },
        otherPets: {
          type: String,
          required: true,
        },
        dogsHealth: {
          type: String,
          required: true,
        },
        dogsNeutered: {
          type: Boolean,
          required: true,
        },
        children: {
          type: String,
          required: true,
        },
        livingSituation: {
          type: String,
          required: true,
        },
      },
      agreement: {
        name: {
          type: String,
          required: true,
        },
        date: {
          type: String,
          required: true,
        },
        signature: {
          type: String,
          required: true,
        },
      },
      messages: {
        stage1: {
          type: String,
          required: false,
        },
        stage2: {
          type: String,
          required: false,
        },
        stage3: {
          type: String,
          required: false,
        },
        stage4: {
          type: String,
          required: false,
        },
      },
      status: {
        type: String,
        required: true,
      },
      ambassador: {
        type: Schema.Types.ObjectId,
        required: false,
      },
      coordinator: {
        type: Schema.Types.ObjectId,
        required: false,
      },
      completedActionItems: {
        type: Boolean,
        required: true,
      },
      selectedDogs: {
<<<<<<< HEAD
        type: [Schema.Types.ObjectId],
        required: true,
=======
        type: [String],
        required: false,
>>>>>>> 48fd2787b69a5ad5d1d28c1ed9a37de064825a54
      },
      preference: {
        type: [String],
        required: false,
      },
    },
    { timestamps: {} }
  ) // TODO make sure timestamps creates createdAt column properly
);
