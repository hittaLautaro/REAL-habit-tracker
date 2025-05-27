package com.hitta.SpringSecurityExample.controller;

import com.hitta.SpringSecurityExample.dtos.*;
import com.hitta.SpringSecurityExample.model.CustomUserDetails;
import com.hitta.SpringSecurityExample.service.HabitService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/habits")
@Tag(name = "Habit Management", description = "Operations for managing user habits and tracking progress")
@SecurityRequirement(name = "bearerAuth")
public class HabitController {

    private final HabitService habitService;

    public HabitController(HabitService habitService) {
        this.habitService = habitService;
    }

    @GetMapping("/")
    @Operation(
            summary = "Get all habits",
            description = "Retrieve all habits for the authenticated user"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Successfully retrieved user habits",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = HabitResponse.class)
                    )
            ),
            @ApiResponse(responseCode = "401", description = "Unauthorized - Authentication required"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<List<HabitResponse>> findAll(
            @Parameter(hidden = true) @AuthenticationPrincipal CustomUserDetails userDetails) {
        List<HabitResponse> habitsRes = habitService.findAll(userDetails.getId());
        return ResponseEntity.ok(habitsRes);
    }

    @GetMapping("/by-day")
    @Operation(
            summary = "Get habits by day of week",
            description = "Retrieve all habits for the authenticated user filtered by specific day of the week"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Successfully retrieved habits for the specified day",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = HabitResponse.class)
                    )
            ),
            @ApiResponse(responseCode = "400", description = "Invalid day parameter"),
            @ApiResponse(responseCode = "401", description = "Unauthorized - Authentication required")
    })
    public ResponseEntity<List<HabitResponse>> findAllByDayOfWeek(
            @Parameter(
                    description = "Day of the week",
                    required = true,
                    example = "MONDAY",
                    schema = @Schema(allowableValues = {"MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"})
            )
            @RequestParam("day") String dayOfWeek,
            @Parameter(hidden = true) @AuthenticationPrincipal CustomUserDetails userDetails) {
        List<HabitResponse> habitsRes = habitService.findAllByDayOfWeek(userDetails.getId(), dayOfWeek);
        return ResponseEntity.ok(habitsRes);
    }

    @GetMapping("/daily-summary")
    @Operation(
            summary = "Get a completion summary of today",
            description = "Retrieve a summary of today's completions by user"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Successfully retrieved summary of today",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = HabitResponse.class)
                    )
            ),
            @ApiResponse(responseCode = "401", description = "Unauthorized - Authentication required")
    })
    public ResponseEntity<CompletionSummaryResponse> findSummaryOfToday(
            @Parameter(hidden = true) @AuthenticationPrincipal CustomUserDetails userDetails) {
        CompletionSummaryResponse summary = habitService.findSummaryOfToday(userDetails.getId());
        return ResponseEntity.ok(summary);
    }

    @GetMapping("/{id}")
    @Operation(
            summary = "Get habit by ID",
            description = "Retrieve a specific habit by its ID for the authenticated user"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Successfully retrieved the habit",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = HabitResponse.class)
                    )
            ),
            @ApiResponse(responseCode = "404", description = "Habit not found"),
            @ApiResponse(responseCode = "401", description = "Unauthorized - Authentication required"),
            @ApiResponse(responseCode = "403", description = "Forbidden - Access denied to this habit")
    })
    public ResponseEntity<HabitResponse> findById(
            @Parameter(hidden = true) @AuthenticationPrincipal CustomUserDetails userDetails,
            @Parameter(description = "ID of the habit to retrieve", required = true, example = "1")
            @PathVariable Integer habitId) {
        HabitResponse habitRes = habitService.findById(userDetails.getId(), habitId);
        return ResponseEntity.ok(habitRes);
    }

    @PostMapping("/")
    @Operation(
            summary = "Create a new habit",
            description = "Create a new habit for the authenticated user"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Habit created successfully",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = HabitResponse.class)
                    )
            ),
            @ApiResponse(responseCode = "400", description = "Invalid request data"),
            @ApiResponse(responseCode = "401", description = "Unauthorized - Authentication required")
    })
    public ResponseEntity<HabitResponse> save(
            @Parameter(hidden = true) @AuthenticationPrincipal CustomUserDetails userDetails,
            @Parameter(description = "Habit creation data", required = true)
            @RequestBody HabitCreateRequest request) {
        HabitResponse habitRes = habitService.save(userDetails.getUser(), request);
        return ResponseEntity.ok(habitRes);
    }

    @Transactional
    @PatchMapping("/{id}/complete")
    @Operation(
            summary = "Update habit completion status",
            description = "Mark a habit as completed or incomplete for the authenticated user"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Habit completion status updated successfully"),
            @ApiResponse(responseCode = "404", description = "Habit not found"),
            @ApiResponse(responseCode = "401", description = "Unauthorized - Authentication required"),
            @ApiResponse(responseCode = "403", description = "Forbidden - Access denied to this habit")
    })
    public ResponseEntity<Void> updateIsCompleted(
            @Parameter(description = "ID of the habit to update", required = true, example = "1")
            @PathVariable("id") Integer habitId,
            @Parameter(description = "Completion status data", required = true)
            @RequestBody HabitCompletedRequest request,
            @Parameter(hidden = true) @AuthenticationPrincipal CustomUserDetails userDetails) {
        habitService.updateIsCompleted(userDetails.getId(), habitId, request.isCompleted());
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/{id}")
    @Operation(
            summary = "Update habit details",
            description = "Update the details of an existing habit for the authenticated user"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Habit updated successfully",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = HabitResponse.class)
                    )
            ),
            @ApiResponse(responseCode = "404", description = "Habit not found"),
            @ApiResponse(responseCode = "400", description = "Invalid request data"),
            @ApiResponse(responseCode = "401", description = "Unauthorized - Authentication required"),
            @ApiResponse(responseCode = "403", description = "Forbidden - Access denied to this habit")
    })
    public ResponseEntity<HabitResponse> update(
            @Parameter(description = "ID of the habit to update", required = true, example = "1")
            @PathVariable("id") Integer habitId,
            @Parameter(description = "Habit update data", required = true)
            @RequestBody HabitUpdateRequest request,
            @Parameter(hidden = true) @AuthenticationPrincipal CustomUserDetails userDetails) {
        HabitResponse habitRes = habitService.update(habitId, userDetails.getId(), request);
        return ResponseEntity.ok(habitRes);
    }

    @Transactional
    @PatchMapping("/")
    @Operation(
            summary = "Update multiple habits",
            description = "Update multiple habits in a single request for the authenticated user"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Habits updated successfully",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = HabitResponse.class)
                    )
            ),
            @ApiResponse(responseCode = "400", description = "Invalid request data"),
            @ApiResponse(responseCode = "401", description = "Unauthorized - Authentication required"),
            @ApiResponse(responseCode = "403", description = "Forbidden - Access denied to one or more habits")
    })
    public ResponseEntity<List<HabitResponse>> updateHabits(
            @Parameter(hidden = true) @AuthenticationPrincipal CustomUserDetails userDetails,
            @Parameter(description = "List of habit update requests", required = true)
            @RequestBody List<HabitUpdateRequest> habitRequests) {
        List<HabitResponse> habitsRes = habitService.updateHabits(habitRequests, userDetails.getId());
        return ResponseEntity.ok(habitsRes);
    }

    @DeleteMapping("/{habitId}")
    @Operation(
            summary = "Delete a habit",
            description = "Delete a specific habit by its ID for the authenticated user"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Habit deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Habit not found"),
            @ApiResponse(responseCode = "401", description = "Unauthorized - Authentication required"),
            @ApiResponse(responseCode = "403", description = "Forbidden - Access denied to this habit")
    })
    public ResponseEntity<Void> delete(
            @Parameter(hidden = true) @AuthenticationPrincipal CustomUserDetails userDetails,
            @Parameter(description = "ID of the habit to delete", required = true, example = "1")
            @PathVariable Integer habitId) {
        habitService.deleteById(habitId, userDetails.getId());
        return ResponseEntity.ok().build();
    }

    @Transactional
    @DeleteMapping("/")
    @Operation(
            summary = "Delete all habits",
            description = "Delete all habits for the authenticated user"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "All habits deleted successfully"),
            @ApiResponse(responseCode = "401", description = "Unauthorized - Authentication required")
    })
    public ResponseEntity<Void> deleteAll(
            @Parameter(hidden = true) @AuthenticationPrincipal CustomUserDetails userDetails) {
        habitService.deleteAll(userDetails.getId());
        return ResponseEntity.ok().build();
    }
}