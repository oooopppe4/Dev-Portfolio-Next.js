"use client";

import { ACHIEVEMENTS } from "../constants/data";
import { MdOutlineArrowOutward } from "react-icons/md";

// =============================================
// MAIN COMPONENT
// =============================================

const AchievementsSection = () => {
  if (!ACHIEVEMENTS || ACHIEVEMENTS.length === 0) {
    return null;
  }

  return (
    <section className="py-5" id="achievements">
      <h2 className="text-xl font-semibold mb-4">achievements.</h2>

      <div className="space-y-6">
        {ACHIEVEMENTS.map((achievement, index) => (
          <div
            key={index}
            className="box bg-background border border-border p-4"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-start gap-3">
                {achievement.icon && (
                  <span className="text-2xl mt-0.5">{achievement.icon}</span>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-medium text-base text-foreground">
                      {achievement.title}
                    </h3>
                    {achievement.date && (
                      <span className="text-xs text-muted-foreground">
                        {achievement.date}
                      </span>
                    )}
                  </div>
                  <p className="text-sm leading-tight text-muted-foreground mt-1">
                    {achievement.description}
                  </p>
                  {achievement.link && (
                    <a
                      href={achievement.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-link font-medium transition mt-2 inline-flex items-center gap-1"
                    >
                      View Details
                      <MdOutlineArrowOutward className="inline-block w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AchievementsSection;

