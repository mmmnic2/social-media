package com.firstversion.socialmedia.scheduler;

import com.firstversion.socialmedia.service.StoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.logging.Logger;

@Component
@Slf4j
@RequiredArgsConstructor
public class StoryCleanUpTask {

    private final StoryService storyService;

    @Scheduled(cron = "0 0 * * * *")
    public void cleanupExpiredStories() {
        log.info("Delete Expired Story Task");
        storyService.deleteExpiredStories();
    }
}
