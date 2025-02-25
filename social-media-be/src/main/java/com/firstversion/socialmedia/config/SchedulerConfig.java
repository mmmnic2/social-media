package com.firstversion.socialmedia.config;

import com.firstversion.socialmedia.common.constant.SchedulerConstant;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;


@Configuration
public class SchedulerConfig {

    @Bean
    public ThreadPoolTaskScheduler taskScheduler() {
        ThreadPoolTaskScheduler scheduler = new ThreadPoolTaskScheduler();
        scheduler.setPoolSize(SchedulerConstant.NUM_OF_THREAD);
        scheduler.setThreadNamePrefix("scheduled-task-");
        return scheduler;
    }
}
