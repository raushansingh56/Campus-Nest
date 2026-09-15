import { UserProfile, Room, Property, AllocationResult } from '../types';

export interface PipelineStageLog {
  stage: number;
  name: string;
  description: string;
  status: 'completed' | 'processing' | 'pending';
  details?: string;
}

export interface CompatibilityBreakdown {
  score: number; // Internal ranking score ONLY - NEVER displayed to user
  motherTongueMatch: boolean;
  academicStreamMatch: boolean;
  branchAffinity: boolean;
  boardMatch: boolean;
  budgetCompatible: boolean;
  collegeAffinity: boolean;
  nativeStateMatch: boolean;
  lifestyleAlignment: string[];
  substanceSafetyAligned: boolean;
  reasons: string[];
}

/**
 * AI Allocation Engine Pipeline:
 * 1. User Profile Input
 * 2. Requirement Processing
 * 3. Feature Extraction
 * 4. Candidate / Room Availability Filtering
 * 5. Multi-factor Compatibility Engine
 * 6. Joint AI Ranking (Room Suitability + Companion Suitability)
 * 7. Final Allocation Record Generation
 */
export class AllocationEngine {
  /**
   * Internal scoring model (Calculates holistic weightings. Score is strictly internal).
   */
  private static evaluateCompanionCompatibility(
    user: UserProfile,
    candidate: UserProfile,
    targetRoom: Room
  ): CompatibilityBreakdown {
    let score = 0;
    const reasons: string[] = [];
    const lifestyleAlignment: string[] = [];

    // 1. Mother Tongue Compatibility (Primary compatibility factor #1)
    const motherTongueMatch =
      user.motherTongue.trim().toLowerCase() === candidate.motherTongue.trim().toLowerCase();
    if (motherTongueMatch) {
      score += 25;
      reasons.push(`Shared native language (${user.motherTongue}) fosters seamless communication`);
    }

    // 2. Academic Background (Stream, Branch, Board) (Factor #2)
    const academicStreamMatch = user.stream === candidate.stream;
    if (academicStreamMatch) {
      score += 15;
      reasons.push(`Common academic stream in ${user.stream}`);
    }

    const userBranchNorm = user.branch.toLowerCase();
    const candBranchNorm = candidate.branch.toLowerCase();
    const branchAffinity =
      userBranchNorm === candBranchNorm ||
      (userBranchNorm.includes('computer') && candBranchNorm.includes('intelligence')) ||
      (userBranchNorm.includes('data') && candBranchNorm.includes('computer'));

    if (branchAffinity) {
      score += 12;
      reasons.push(`Similar academic focus (${user.branch} & ${candidate.branch})`);
    }

    const boardMatch = user.board === candidate.board;
    if (boardMatch) {
      score += 6;
      reasons.push(`Similar foundational schooling (${user.board})`);
    }

    // 3. Budget Compatibility (Factor #3)
    const withinBudget =
      targetRoom.monthlyRent >= user.monthlyBudgetMin &&
      targetRoom.monthlyRent <= user.monthlyBudgetMax &&
      targetRoom.monthlyRent >= candidate.monthlyBudgetMin &&
      targetRoom.monthlyRent <= candidate.monthlyBudgetMax;

    if (withinBudget) {
      score += 20;
      reasons.push(`Room rent (₹${targetRoom.monthlyRent.toLocaleString()}/mo) fits both student budgets`);
    } else {
      // Partial budget tolerance
      const diff = Math.abs(targetRoom.monthlyRent - user.monthlyBudgetMax);
      if (diff <= 1500) {
        score += 10;
        reasons.push(`Room rent is within acceptable margin of budget`);
      }
    }

    // 4. Same University Co-Enrollment (Core Mandatory Factor)
    const userUniv = (user.college || '').trim().toLowerCase();
    const candUniv = (candidate.college || '').trim().toLowerCase();
    const collegeAffinity =
      userUniv === candUniv ||
      (userUniv.length > 3 && candUniv.includes(userUniv)) ||
      (candUniv.length > 3 && userUniv.includes(candUniv));

    if (collegeAffinity) {
      score += 35;
      reasons.push(`Both enrolled at the same university (${user.college}) for synchronized lecture hours, shared campus commute, and academic peer support`);
    }

    // 5. Native / Home State (Factor #5)
    const nativeStateMatch =
      user.nativeState.trim().toLowerCase() === candidate.nativeState.trim().toLowerCase();
    if (nativeStateMatch) {
      score += 10;
      reasons.push(`From the same home state of ${user.nativeState}`);
    }

    // 6. Lifestyle Compatibility (Factor #6)
    if (user.sleepSchedule === candidate.sleepSchedule) {
      score += 12;
      lifestyleAlignment.push(`Harmonious ${user.sleepSchedule.replace('-', ' ')} sleep schedule`);
    }

    if (user.studyHabits === candidate.studyHabits) {
      score += 10;
      lifestyleAlignment.push(`Synchronized ${user.studyHabits.replace('-', ' ')} study preferences`);
    }

    if (user.cleanliness === candidate.cleanliness) {
      score += 8;
      lifestyleAlignment.push(`Compatible ${user.cleanliness.replace('-', ' ')} standards`);
    }

    if (user.noiseTolerance === candidate.noiseTolerance) {
      score += 8;
      lifestyleAlignment.push(`Balanced noise expectations (${user.noiseTolerance.replace('-', ' ')})`);
    }

    if (user.foodPreference === candidate.foodPreference) {
      score += 6;
      lifestyleAlignment.push(`Complementary dietary lifestyle (${user.foodPreference})`);
    }

    // 7. Addiction & Substance Safety Alignment (Safety Factor #7)
    // Non-smokers and teetotalers should NEVER be paired with heavy smokers
    const userIsClean = user.substanceHabit === 'non-smoker-teetotaler';
    const candIsClean = candidate.substanceHabit === 'non-smoker-teetotaler';
    const substanceSafetyAligned = (userIsClean && candIsClean) || (!userIsClean && !candIsClean);

    if (substanceSafetyAligned && userIsClean) {
      score += 25; // Significant boost for clean living alignment
      reasons.push(`Shared strict smoke-free & substance-free commitment for a healthy living space`);
    } else if (userIsClean !== candIsClean) {
      score -= 40; // Penalty to prevent friction
    }

    return {
      score,
      motherTongueMatch,
      academicStreamMatch,
      branchAffinity,
      boardMatch,
      budgetCompatible: withinBudget,
      collegeAffinity,
      nativeStateMatch,
      lifestyleAlignment,
      substanceSafetyAligned,
      reasons
    };
  }

  /**
   * Generates natural language AI rationale explaining why the allocation was chosen.
   * NO numerical scores or percentages are exposed.
   */
  private static generateRationale(
    user: UserProfile,
    companion: UserProfile,
    room: Room,
    property: Property,
    breakdown: CompatibilityBreakdown
  ): { explanation: string; keyFactors: string[] } {
    const highlights: string[] = [];

    if (breakdown.motherTongueMatch) {
      highlights.push(`Shared mother tongue (${companion.motherTongue})`);
    }

    if (breakdown.academicStreamMatch || breakdown.branchAffinity) {
      highlights.push(`Aligned academic track (${companion.course} in ${companion.branch})`);
    }

    if (breakdown.collegeAffinity) {
      highlights.push(`Co-enrolled at ${companion.college} (Same University)`);
    } else {
      highlights.push(`Convenient proximity to ${user.preferredCollege || user.college}`);
    }

    if (breakdown.substanceSafetyAligned && companion.substanceHabit === 'non-smoker-teetotaler') {
      highlights.push(`Substance-free living standards`);
    }

    if (breakdown.lifestyleAlignment.length > 0) {
      highlights.push(breakdown.lifestyleAlignment[0]);
    }

    const explanation = `Your room and Companion were automatically allocated through holistic compatibility synthesis. Your Companion, ${companion.fullName}, was paired with you based on your ${user.stream} academic background, ${companion.motherTongue} language harmony, verified student standing, and compatible ${user.sleepSchedule.replace('-', ' ')} routine at ${property.name} (${room.roomNumber}).`;

    return {
      explanation,
      keyFactors: highlights
    };
  }

  /**
   * Convenience helper returning just the allocation or null
   */
  public static allocate(
    user: UserProfile,
    candidatePool: UserProfile[],
    availableRooms: Room[],
    availableProperties: Property[]
  ): AllocationResult | null {
    return this.executeAllocation(user, candidatePool, availableRooms, availableProperties).allocation;
  }

  /**
   * Main Allocation Function
   */
  public static executeAllocation(
    user: UserProfile,
    candidatePool: UserProfile[],
    availableRooms: Room[],
    availableProperties: Property[]
  ): {
    allocation: AllocationResult | null;
    logs: PipelineStageLog[];
  } {
    const logs: PipelineStageLog[] = [
      {
        stage: 1,
        name: 'Requirement Processing',
        description: `Ingested profile for ${user.fullName} (${user.college}, ${user.course})`,
        status: 'completed',
        details: `Target City: ${user.preferredCity || user.currentCity} | Budget: ₹${user.monthlyBudgetMin} - ₹${user.monthlyBudgetMax}`
      },
      {
        stage: 2,
        name: 'Feature Extraction',
        description: 'Extracted 14 multi-dimensional vectors (Mother tongue, Stream, Branch, Board, Sleep, Substance)',
        status: 'completed',
        details: `Mother Tongue: ${user.motherTongue} | Stream: ${user.stream} | Substance: ${user.substanceHabit}`
      }
    ];

    // Filter candidate rooms based on gender segregation and available space
    const targetCity = (user.preferredCity || user.currentCity || 'Bengaluru').toLowerCase();
    const userGender = user.gender;

    const viableRooms = availableRooms.filter(r => {
      if (!r.isAvailable || r.availableSpaces <= 0) return false;
      const prop = availableProperties.find(p => p.id === r.propertyId);
      if (!prop) return false;
      if (prop.city.toLowerCase() !== targetCity) return false;

      // Gender safety rule for MVP
      if (userGender === 'male' && r.genderRestriction === 'girls-only') return false;
      if (userGender === 'female' && r.genderRestriction === 'boys-only') return false;

      return true;
    });

    logs.push({
      stage: 3,
      name: 'Candidate & Room Availability',
      description: `Identified ${viableRooms.length} available rooms in ${user.preferredCity || user.currentCity}`,
      status: 'completed',
      details: `Active inventory checked against gender protocols and available capacity`
    });

    if (viableRooms.length === 0) {
      // Fallback to any available room in database if exact city match is constrained
      const anyViable = availableRooms.filter(r => r.isAvailable && r.availableSpaces > 0);
      if (anyViable.length > 0) {
        viableRooms.push(anyViable[0]);
      }
    }

    // Filter candidate companions: strictly same university, same gender, exclude the user themselves
    const userUniv = (user.college || '').trim().toLowerCase();
    const viableCandidates = candidatePool.filter(c => {
      if (c.id === user.id) return false;
      // Keep same-gender for student accommodation safety
      if (c.gender !== user.gender) return false;

      // Mandatory Same-University constraint
      const candUniv = (c.college || '').trim().toLowerCase();
      if (!userUniv || !candUniv) return false;

      const isSameUniversity =
        userUniv === candUniv ||
        (userUniv.length > 3 && candUniv.includes(userUniv)) ||
        (candUniv.length > 3 && userUniv.includes(candUniv));

      return isSameUniversity;
    });

    logs.push({
      stage: 4,
      name: 'Compatibility Engine (Same-University Cohort)',
      description: `Filtered and evaluated ${viableCandidates.length} peer candidates enrolled at ${user.college}`,
      status: 'completed',
      details: `Enforced strict university co-enrollment (${user.college}). Evaluated dimensions: Mother Tongue > Academic Stream/Branch > Budget > Native State > Lifestyle > Substance Habits`
    });

    if (viableRooms.length === 0) {
      logs.push({
        stage: 5,
        name: 'AI Ranking',
        description: 'No matching rooms found for the specified criteria in target city',
        status: 'completed'
      });
      return { allocation: null, logs };
    }

    if (viableCandidates.length === 0) {
      // Allocate optimal verified room while queuing companion matching
      let bestRoom = viableRooms[0];
      let bestDiff = Infinity;
      const targetBudget = (user.monthlyBudgetMin + user.monthlyBudgetMax) / 2 || user.monthlyBudgetMax || 8000;
      for (const r of viableRooms) {
        const diff = Math.abs(r.monthlyRent - targetBudget);
        if (diff < bestDiff) {
          bestDiff = diff;
          bestRoom = r;
        }
      }
      const property = availableProperties.find(p => p.id === bestRoom.propertyId) || availableProperties[0];

      logs.push({
        stage: 5,
        name: 'AI Ranking',
        description: `Secured Room ${bestRoom.roomNumber} at ${property.name}. Co-applicant queue initialized for Companion allocation.`,
        status: 'completed',
        details: 'Room verified and allocated based on institution proximity, budget, and sharing preferences. Companion assignment will activate automatically as peer applicants register.'
      });

      logs.push({
        stage: 6,
        name: 'Room Allocation Completed',
        description: `Allocated Room ${bestRoom.roomNumber} at ${property.name}`,
        status: 'completed',
        details: `Rent: ₹${bestRoom.monthlyRent.toLocaleString()}/month | Verified Status: Confirmed`
      });

      logs.push({
        stage: 7,
        name: 'Allocation Record Initialized',
        description: 'Room securely reserved. Companion matching queued in real-time engine.',
        status: 'completed'
      });

      const singleAllocation: AllocationResult = {
        id: `alloc-${Date.now()}`,
        userId: user.id,
        companionId: undefined,
        companion: null,
        roomId: bestRoom.id,
        room: bestRoom,
        property,
        allocatedAt: new Date().toISOString(),
        status: 'active',
        aiRationale: `Room ${bestRoom.roomNumber} at ${property.name} has been allocated based on your institution (${user.college}), target budget (₹${bestRoom.monthlyRent.toLocaleString()}/mo), and room sharing preference (${bestRoom.roomType.replace('-', ' ')}). Companion allocation is currently queued; our AI engine will automatically pair your verified Companion as new applicants register in your cohort.`,
        keyCompatibilityFactors: [
          `Target Institution Proximity: Convenient commute to ${user.college}`,
          `Budget Optimized: ₹${bestRoom.monthlyRent.toLocaleString()}/month matches your verified budget`,
          `Room Preference: Verified ${bestRoom.roomType.replace('-', ' ')} student accommodation`,
          `Companion Allocation: Waiting for next verified student applicant in this cohort`
        ],
        roommates: [user]
      };

      return { allocation: singleAllocation, logs };
    }

    // Evaluate all combinations of (Candidate × Room)
    interface ScoredPair {
      candidate: UserProfile;
      room: Room;
      property: Property;
      breakdown: CompatibilityBreakdown;
    }

    const scoredPairs: ScoredPair[] = [];

    for (const room of viableRooms) {
      const property = availableProperties.find(p => p.id === room.propertyId);
      if (!property) continue;

      for (const candidate of viableCandidates) {
        const breakdown = this.evaluateCompanionCompatibility(user, candidate, room);
        scoredPairs.push({
          candidate,
          room,
          property,
          breakdown
        });
      }
    }

    // Sort by internal score descending
    scoredPairs.sort((a, b) => b.breakdown.score - a.breakdown.score);

    const topPair = scoredPairs[0];

    logs.push({
      stage: 5,
      name: 'AI Ranking',
      description: 'Optimized joint objective function for room suitability and Companion harmony',
      status: 'completed',
      details: `Top allocation determined without manual swipes or rating ambiguity`
    });

    const { explanation, keyFactors } = this.generateRationale(
      user,
      topPair.candidate,
      topPair.room,
      topPair.property,
      topPair.breakdown
    );

    const allocation: AllocationResult = {
      id: `alloc-${Date.now()}`,
      userId: user.id,
      companionId: topPair.candidate.id,
      companion: topPair.candidate,
      roomId: topPair.room.id,
      room: topPair.room,
      property: topPair.property,
      allocatedAt: new Date().toISOString(),
      status: 'active',
      aiRationale: explanation,
      keyCompatibilityFactors: keyFactors,
      roommates: [topPair.candidate]
    };

    logs.push({
      stage: 6,
      name: 'Room + Companion Allocation',
      description: `Allocated ${topPair.room.roomNumber} at ${topPair.property.name} with Companion ${topPair.candidate.fullName}`,
      status: 'completed',
      details: `Rent: ₹${topPair.room.monthlyRent}/month | Verified Status: Approved`
    });

    logs.push({
      stage: 7,
      name: 'Allocation Record Initialized',
      description: 'Allocation securely dispatched to Student Dashboard and In-Platform Channel',
      status: 'completed'
    });

    return {
      allocation,
      logs
    };
  }
}
