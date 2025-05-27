package com.hitta.SpringSecurityExample.controller;

import com.hitta.SpringSecurityExample.dtos.CompletionResponse;
import com.hitta.SpringSecurityExample.dtos.CompletionSummaryResponse;
import com.hitta.SpringSecurityExample.model.CustomUserDetails;
import com.hitta.SpringSecurityExample.service.CompletionService;
import com.hitta.SpringSecurityExample.service.CompletionSummaryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/completions")
@Tag(name = "Completions", description = "Habit completions endpoints")
public class CompletionController {

    private final CompletionService completionService;
    private final CompletionSummaryService completionSummaryService;

    public CompletionController(
            CompletionService completionService,
            CompletionSummaryService completionSummaryService
    ){
        this.completionService = completionService;
        this.completionSummaryService = completionSummaryService;
    }

    @GetMapping("/summary")
    @Operation(
            summary = "Get yearly completion summaries",
            description = "Retrieves summary data for all habits completed by the authenticated user in the specified year."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Successfully retrieved completion summaries",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = CompletionSummaryResponse.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Unauthorized - user is not authenticated",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(value = "{\"error\": \"Unauthorized\"}")
                    )
            )
    })
    public ResponseEntity<List<CompletionSummaryResponse>> getCompletionsSummaryByYear(
            @Parameter(description = "Year for which to retrieve completion summaries", example = "2025", required = true)
            @RequestParam Integer year,
            @Parameter(hidden = true)
            @AuthenticationPrincipal CustomUserDetails userDetails){
        return ResponseEntity.ok(completionSummaryService.getCompletionsByYear(year, userDetails.getId()));
    }

    @GetMapping("/habit-summary")
    @Operation(
            summary = "Get yearly completion data for a specific habit",
            description = "Retrieves all completions for a specific habit by the authenticated user in the specified year."
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Successfully retrieved habit completion data",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = CompletionResponse.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Unauthorized - user is not authenticated",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(value = "{\"error\": \"Unauthorized\"}")
                    )
            ),
            @ApiResponse(
                    responseCode = "404",
                    description = "Habit not found or no data for the specified year",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(value = "{\"error\": \"Habit not found\"}")
                    )
            )
    })
    public ResponseEntity<List<CompletionResponse>> getSingularHabitCompletionsByYear(
            @Parameter(description = "Year for which to retrieve habit completions", example = "2025", required = true)
            @RequestParam Integer year,
            @Parameter(description = "ID of the habit to retrieve completions for", example = "3", required = true)
            @RequestParam Integer habitId,
            @Parameter(hidden = true)
            @AuthenticationPrincipal CustomUserDetails userDetails
    ){
        return ResponseEntity.ok(completionService.getCompletionsByYearAndHabit(year, userDetails.getId(), habitId));
    }

}
