package com.firstversion.socialmedia.scheduler;

import com.firstversion.socialmedia.service.StoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.logging.Logger;

@Component
public class StoryCleanUpTask {
    private Logger logger;
    @Autowired
    private StoryService storyService;

    @Scheduled(cron = "0 0 * * * *")
    public void cleanupExpiredStories() {
        logger.info("Delete Expired Story Task");
        storyService.deleteExpiredStories();
    }
}
