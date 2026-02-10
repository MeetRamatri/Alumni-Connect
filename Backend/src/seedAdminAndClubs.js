import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.model.js";
import Clubs from "./models/Clubs.model.js";

dotenv.config();

const seed = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Connected to MongoDB...");

        // 1. Seed Admin User
        const adminEmail = "ytharshu405@gmail.com";
        const adminPassword = "123456";
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(adminPassword, salt);

        let adminUser = await User.findOne({ email: adminEmail });

        if (adminUser) {
            adminUser.role = "admin";
            adminUser.password = hashedPassword;
            await adminUser.save();
            console.log("Admin user updated successfully.");
        } else {
            adminUser = new User({
                fullName: "Admin User",
                email: adminEmail,
                password: hashedPassword,
                role: "admin",
                batch: 2020, // Dummy data
                cur_role: "Administrator",
                company: "Alumni Connect",
                location: "Campus",
            });
            await adminUser.save();
            console.log("Admin user created successfully.");
        }

        // 2. Seed Clubs
        const clubsToSeed = [
            {
                name: "Competitive Programming",
                description: "Master algorithms and data structures. Participate in global contests like ICPC, Codeforces, and LeetCode.",
                longDescription: "The CP Club is dedicated to fostering a strong algorithmic culture. We host weekly contests, problem-solving sessions, and workshops on advanced data structures and algorithms.",
                tag: "Technical",
                icon: "Code",
                color: "bg-blue-100 text-blue-800",
                memberCount: "150+ members",
                president: "Alex Chen",
                vicePresident: "Sarah Jones",
                members: ["Alex Chen", "Sarah Jones"],
                achievements: ["Regional ICPC Finalists 2024", "Top 100 in Hacktoberfest"]
            },
            {
                name: "GDSC (Google Developer Student Clubs)",
                description: "Learn web, app, and cloud development with Google technologies. Build projects that solve real-world problems.",
                longDescription: "GDSC is a community-backed technical club for students interested in Google developer technologies. We conduct workshops, hackathons, and project-building sessions.",
                tag: "Technical",
                icon: "Code",
                color: "bg-green-100 text-green-800",
                memberCount: "200+ members",
                president: "Priya Sharma",
                vicePresident: "John Doe",
                members: ["Priya Sharma", "John Doe"],
                achievements: ["Solution Challenge Regional Winners", "50+ Projects Built"]
            },
            {
                name: "AI & ML Club",
                description: "Dive into the world of Artificial Intelligence and Machine Learning. Build models and explore cutting-edge research.",
                longDescription: "From neural networks to computer vision, we explore it all. Join us to learn, research, and build intelligent systems.",
                tag: "Technical",
                icon: "Lightbulb",
                color: "bg-indigo-100 text-indigo-800",
                memberCount: "120+ members",
                president: "David Kim",
                vicePresident: "Emily White",
                members: ["David Kim", "Emily White"],
                achievements: ["Best AI Paper Award 2023", "Hackathon Winners"]
            },
            {
                name: "Sports Club",
                description: "Stay fit and compete! From football and cricket to badminton and athletics, we have it all.",
                longDescription: "The Sports Club encourages physical well-being and team spirit. We organize inter-batch tournaments, daily practice sessions, and select teams to represent the college.",
                tag: "Sports",
                icon: "Trophy",
                color: "bg-orange-100 text-orange-800",
                memberCount: "200+ members",
                president: "Mike Ross",
                vicePresident: "Rachel Zane",
                members: ["Mike Ross", "Rachel Zane"],
                achievements: ["Inter-college Cricket Champions 2023", "Gold in Athletics Meet"]
            },
            {
                name: "Music Club",
                description: "For the love of melody. Jam sessions, band performances, and musical workshops for everyone.",
                longDescription: "Whether you sing, play an instrument, or just love music, this is the place for you. We organize open mic nights, concerts, and collaborative jam sessions.",
                tag: "Cultural",
                icon: "Music",
                color: "bg-purple-100 text-purple-800",
                memberCount: "100+ members",
                president: "Chris Martin",
                vicePresident: "Taylor Swift",
                members: ["Chris Martin", "Taylor Swift"],
                achievements: ["Battle of Bands Winners", "Annual Concert Success"]
            },
            {
                name: "Robotics Club",
                description: "Build bots, fight bots, and innovate. Learn electronics, mechanics, and programming.",
                longDescription: "The Robotics Club is where hardware meets software. We build line followers, combat robots, and automation projects. Join us to get your hands dirty with electronics.",
                tag: "Technical",
                icon: "Code",
                color: "bg-red-100 text-red-800",
                memberCount: "80+ members",
                president: "Tony Stark",
                vicePresident: "Bruce Banner",
                members: ["Tony Stark", "Bruce Banner"],
                achievements: ["Robowars Champions 2024", "Best Innovation Award"]
            },
            {
                name: "Literary Society",
                description: "Read, write, and debate. A haven for poets, writers, and public speakers.",
                longDescription: "The Lit Soc organizes debates, poetry slams, book discussions, and creative writing workshops. Express yourself through words.",
                tag: "Cultural",
                icon: "BookOpen",
                color: "bg-yellow-100 text-yellow-800",
                memberCount: "90+ members",
                president: "Elizabeth Bennet",
                vicePresident: "Sherlock Holmes",
                members: ["Elizabeth Bennet", "Sherlock Holmes"],
                achievements: ["National Debate Winners", "Published College Magazine"]
            }
        ];

        for (const clubData of clubsToSeed) {
            const existingClub = await Clubs.findOne({ name: clubData.name });
            if (!existingClub) {
                await Clubs.create(clubData);
                console.log(`Created club: ${clubData.name}`);
            } else {
                console.log(`Club already exists: ${clubData.name}`);
            }
        }

        console.log("Seeding completed successfully.");
        process.exit(0);

    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seed();
